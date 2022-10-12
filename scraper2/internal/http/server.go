package http

import (
	"context"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/stevenhansel/binus-logbook/scraper/internal/container"
	"github.com/stevenhansel/binus-logbook/scraper/internal/http/controllers"
)

type Server struct {
	container *container.Container
	server    http.Server
}

func (s *Server) routes() chi.Router {
	r := chi.NewRouter()

	controllers.NewStudentController(r, s.container.Responseutil, s.container.StudentService).Routes()

	return r
}

func (s *Server) Serve() error {
	s.server = http.Server{
		Addr:    fmt.Sprintf(":%d", 8080),
		Handler: s.routes(),
	}

	return s.server.ListenAndServe()
}

func (s *Server) Shutdown(ctx context.Context) error {
	return s.server.Shutdown(ctx)
}

func New(container *container.Container) *Server {
	return &Server{
		container: container,
	}
}
