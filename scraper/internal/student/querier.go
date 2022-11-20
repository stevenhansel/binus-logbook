package student

import "github.com/stevenhansel/binus-logbook/scraper/internal/models"

type Scraper interface {
	Login(email, password string) *models.Task
}

type Queue interface {
	Enqueue(task *models.Task)
}
