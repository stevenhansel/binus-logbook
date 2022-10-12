package student

import "github.com/stevenhansel/binus-logbook/scraper/internal/binus"

type BinusScraperQuerier interface {
	Login(email, password string) (*binus.Student, error)
}
