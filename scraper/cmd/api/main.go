package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/playwright-community/playwright-go"
	"go.uber.org/zap"

	"github.com/stevenhansel/binus-logbook/scraper/internal/binus"
	"github.com/stevenhansel/binus-logbook/scraper/internal/grpc"
	"github.com/stevenhansel/binus-logbook/scraper/internal/queue"
	"github.com/stevenhansel/binus-logbook/scraper/internal/student"
)

func main() {
	var port int
	flag.IntVar(&port, "port", 9000, "Port for the gRPC server")
	flag.Parse()

	log, err := zap.NewProduction()
	if err != nil {
		os.Exit(1)
	}

	if err := playwright.Install(); err != nil {
		log.Error("An error occurred during the installation process of playwright", zap.String("error", fmt.Sprint(err)))
	}

	consumer := queue.NewConsumer()

	scraper := binus.New()
	studentService := student.NewService(scraper)

	fmt.Printf("gRPC Server has started on localhost:%d\n", port)

	server := grpc.New(studentService, consumer)
	server.Run(int32(port))
}
