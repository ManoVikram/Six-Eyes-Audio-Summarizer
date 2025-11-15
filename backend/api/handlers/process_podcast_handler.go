package handlers

import (
	"fmt"
	"net/http"

	"github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/models"
	pb "github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/proto"
	"github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/services"
	"github.com/gin-gonic/gin"
)

func ProcessPodcastHandler(services *services.Services) gin.HandlerFunc {
	return func(c *gin.Context) {
		// Step 1 - Unmarshal the request JSON
		var request models.ProcessPodcastRequest

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid request payload: %v", err)})
			return
		}

		// Step 2 - Convert the request to protobuf format (gRPC request)
		grpcRequest := &pb.SummarizePodcastRequest{
			AudioBytes:   request.AudioBytes,
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
		response := models.ProcessPodcastResponse{
			Transcript:        grpcResponse.Transcript,
			BulletPoints:      grpcResponse.BulletPoints,
			SummaryParagrah:   grpcResponse.SummaryParagraph,
			BlogPost:          *grpcResponse.BlogPost,
			SummaryAudioBytes: grpcResponse.SummaryAudioBytes,
			Metadata:          grpcRequest.Metadata,
		}

		// Step 5 - Return the response
		c.JSON(http.StatusOK, response)
	}
}
