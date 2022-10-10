package main

import (
	"context"
	"errors"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"go.uber.org/zap"

	"github.com/stevenhansel/binus-logbook/scraper/internal/container"
	internalhttp "github.com/stevenhansel/binus-logbook/scraper/internal/http"
)

func main() {
	ctx := context.Background()

	log, err := zap.NewProduction()
	if err != nil {
		os.Exit(1)
	}

	container := container.New(log)
	server := internalhttp.New(container)

	stop := make(chan struct{})
	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, syscall.SIGINT, syscall.SIGTERM, os.Interrupt, os.Kill)
		<-sigint

		if err := server.Shutdown(ctx); err != nil {
			log.Error("An error occurred during shutting down the server")
		}

		close(stop)
	}()

	log.Info("Scraper API has started running on http://localhost:8080")
	if err := server.Serve(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Error("An error occurred during serving the server")
	}

	<-stop
}
