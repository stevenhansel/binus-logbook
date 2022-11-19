package main

import (
	"fmt"
	"os"

	"github.com/playwright-community/playwright-go"
	"github.com/stevenhansel/binus-logbook/scraper/internal/grpc"
	"go.uber.org/zap"
)

func main() {
	// ctx := context.Background()

	log, err := zap.NewProduction()
	if err != nil {
		os.Exit(1)
	}

	if err := playwright.Install(); err != nil {
		log.Error("An error occurred during the installation process of playwright", zap.String("error", fmt.Sprint(err)))
	}

	// scraper := binus.New()
	// studentService := student.NewService(scraper)

	fmt.Println("Server has started on localhost:9000")

	server := grpc.New()
	server.Run(9000)
}
