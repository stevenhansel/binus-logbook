package grpc

import (
	"fmt"
	"log"
	"net"

	"google.golang.org/grpc"

	pb "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto"
)

type Server struct{}

func New() *Server {
	return &Server{}
}

func (s *Server) Run(port int32) error {
	l, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	srv := grpc.NewServer()
	pb.RegisterGreeterServer(srv, &grpcServer{})

	return srv.Serve(l)
}
