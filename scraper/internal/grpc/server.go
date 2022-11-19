package grpc

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	result "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto/result"
	scraper "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto/scraper"
)

type Server struct {
	student  StudentQuerier
	consumer ConsumerQuerier
}

func New(student StudentQuerier, consumer ConsumerQuerier) *Server {
	return &Server{
		student:  student,
		consumer: consumer,
	}
}

func (s *Server) Run(port int32) error {
	l, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	srv := grpc.NewServer()
	grpcServer := newGrpcServer(s.student, s.consumer)

	scraper.RegisterScraperServer(srv, grpcServer)
	result.RegisterResultListenerServer(srv, grpcServer)

	return srv.Serve(l)
}
