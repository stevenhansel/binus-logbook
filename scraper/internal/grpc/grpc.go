package grpc

import (
	"context"

	"google.golang.org/protobuf/types/known/emptypb"

	result "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto/result"
	scraper "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto/scraper"
)

type grpcServer struct {
	scraper.UnimplementedScraperServer
	result.UnimplementedResultListenerServer

	student  StudentQuerier
	consumer ConsumerQuerier
}

func newGrpcServer(student StudentQuerier, consumer ConsumerQuerier) *grpcServer {
	return &grpcServer{
		student:  student,
		consumer: consumer,
	}
}

// Scraper
func (s *grpcServer) Login(ctx context.Context, req *scraper.LoginRequest) (*scraper.TaskResponse, error) {
	t, err := s.student.Login(ctx, req.Email, req.Password)
	if err != nil {
		return nil, err
	}

	tasks := make([]*scraper.TaskResponse_Task, len(t.Tasks))
	for i, task := range t.Tasks {
		tasks[i] = &scraper.TaskResponse_Task{
			Step: task.Step,
			Name: task.Name,
		}
	}

	return &scraper.TaskResponse{
		Title: t.Title,
		Tasks: tasks,
	}, nil
}

// Result
func (s *grpcServer) Listen(empty *emptypb.Empty, stream result.ResultListener_ListenServer) error {
	return s.consumer.Consume(stream)
}
