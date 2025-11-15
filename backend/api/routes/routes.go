package routes

import (
	"github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/handlers"
	"github.com/ManoVikram/AI-Podcast-Summarizer/backend/api/services"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine, services *services.Services) {
	// POST request to process the podcast and return the transcript / summary paragraph / summary audio / blog post
	server.POST("/api/processaudio", handlers.ProcessPodcastHandler(services))
}
