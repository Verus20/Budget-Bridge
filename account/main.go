package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewProduction()

	defer logger.Sync()

	logger.Info("Starting server...")

	router := setupRouter()

	srv := &http.Server{
		Addr: ":8080",
		Handler: router,
	}

	srv.ListenAndServe()

}

func setupRouter() *gin.Engine {
	router := gin.Default()

	router.GET("api/account", func(c *gin.Context){
		c.JSON(http.StatusOK, gin.H{
			"hi": "world",
		})
	})

	return router
}