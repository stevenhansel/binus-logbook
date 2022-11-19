package grpc

import (
	"context"

	result "github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto/result"
	"github.com/stevenhansel/binus-logbook/scraper/internal/models"
)

type StudentQuerier interface {
	Login(ctx context.Context, email, password string) (*models.Task, error)
}

type ConsumerQuerier interface {
	Consume(stream result.ResultListener_ListenServer) error
}
