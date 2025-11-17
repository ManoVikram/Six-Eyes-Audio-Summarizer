package handlers

import (
	"encoding/base64"
	"fmt"
	"net/http"
	"strings"

	"github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/models"
	pb "github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/proto"
	"github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/services"
	"github.com/gin-gonic/gin"
)

func decodeBase64Audio(b64 string) ([]byte, error) {
	// Step 1 - Remove data:audio/mp3;base64, prefix
	if index := strings.Index(b64, ","); index != -1 {
		b64 = b64[index+1:]
	}

	// Step 2 - Remove whitespaces and escape characters
	b64 = strings.TrimSpace(b64)
	b64 = strings.ReplaceAll(b64, "\n", "")
	b64 = strings.ReplaceAll(b64, "\r", "")

	// Step 3 - Decode the base64 to bytes
	decodedAudioBytes, err := base64.StdEncoding.DecodeString(b64)
	if err != nil {
		return nil, fmt.Errorf("invalid base64 audio: %w", err)
	}

	return decodedAudioBytes, nil
}

func encodeBase64Audio(bytes []byte) string {
	if len(bytes) == 0 {
		return ""
	}
	return base64.StdEncoding.EncodeToString(bytes)
}

func ProcessPodcastHandler(services *services.Services) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Step 1 - Unmarshal the request JSON
		var request models.ProcessPodcastRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid request payload: %v", err)})
			return
		}

		// Step 2 - Convert the request to protobuf format (gRPC request)
		// Step 2.1 - Convert the base64 audio to raw bytes
		decodedAudioBytes, err := decodeBase64Audio(request.AudioB64)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Unable to convert the base64 audio to bytes: %v", err)})
			return
		}

		// Step 2.2 - Prepare the gRPC request
		grpcRequest := &pb.SummarizePodcastRequest{
			AudioBytes:   decodedAudioBytes,
			AudioFormat:  request.AudioFormat,
			LanguageHint: &request.LanguageHint,
			GenerateBlog: request.GenerateBlog,
			GenerateTts:  request.GenerateTTS,
			Metadata:     request.Metadata,
		}

		// Step 3 - Call the gRPC method to process the podcast
		grpcResponse, err := services.AIclient.ProcessPodcast(c.Request.Context(), grpcRequest)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to process podcast: %v", err)})
			return
		}

		// Step 4 - Covnert the gRPC response to the API response format
		// Step 4.1 - Convert the bytes summary audio to base64
		summaryAudioB64 := encodeBase64Audio(grpcResponse.SummaryAudioBytes)

		// Step 4.2 - Prepare the response
		response := models.ProcessPodcastResponse{
			Transcript:      grpcResponse.Transcript,
			BulletPoints:    grpcResponse.BulletPoints,
			SummaryParagrah: grpcResponse.SummaryParagraph,
			BlogPost:        *grpcResponse.BlogPost,
			SummaryAudioB64: summaryAudioB64,
			Metadata:        grpcRequest.Metadata,
		}

		// Step 5 - Return the response
		c.JSON(http.StatusOK, response)
	}
}
