package grpc

import (
	"context"
	"log"

	pb "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto"
)

type grpcServer struct {
	pb.UnimplementedGreeterServer
}

func (s *grpcServer) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	return &pb.HelloReply{Message: "Hello " + in.GetName()}, nil
}
