package student

import (
	"context"

	"github.com/stevenhansel/binus-logbook/scraper/internal/models"
)

type StudentService struct {
	scraper Scraper
	queue   Queue
}

func NewService(scraper Scraper) *StudentService {
	return &StudentService{scraper: scraper}
}

func (s *StudentService) Login(ctx context.Context, email, password string) (*models.Task, error) {
	task := s.scraper.Login(email, password)
	s.queue.Enqueue(task)

	return task, nil
}
