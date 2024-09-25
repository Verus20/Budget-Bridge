package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
)

func main() {
	logger := zap.NewExample().Sugar()

	defer logger.Sync()

	logger.Info("Starting server...")

	router := setupRouter()

	srv := &http.Server{
		Addr: ":8080",
		Handler: router,
	}

	// initialize channel of type os.Signal with buffer size 1 (it holds one signal at a time)
	quit := make(chan os.Signal, 1)

	// catch interrupt and terminate signals
	// these signals can be caught or ignored
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			logger.Errorf("error: %s", err)
		}
	}()
	
	// receive value from quit channel
	<-quit

	logger.Info("Shutting down server...")

	// context informs server it has 5 seconds to finish the request it handles before stoppng
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		logger.Fatalf("Error while shutting down server.  Initiating forcefully shutdown: %s", err.Error())
	} else {
		logger.Info("Server exiting")
	}
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