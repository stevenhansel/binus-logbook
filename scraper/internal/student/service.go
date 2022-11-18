package student

import "github.com/stevenhansel/binus-logbook/scraper/internal/models"

type StudentService struct {
	scraper Scraper
}

func NewService(scraper Scraper) *StudentService {
	return &StudentService{scraper: scraper}
}

func (s *StudentService) Login(email, password string) (*models.Student, error) {
	return s.scraper.Login(email, password)
}
