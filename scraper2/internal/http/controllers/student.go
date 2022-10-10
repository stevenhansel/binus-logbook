package controllers

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/stevenhansel/binus-logbook/scraper/internal/http/responseutil"
)

type StudentController struct {
	router       chi.Router
	responseutil *responseutil.Responseutil
}

func NewStudentController(router chi.Router, responseutil *responseutil.Responseutil) *StudentController {
	return &StudentController{
		router:       router,
		responseutil: responseutil,
	}
}

func (c *StudentController) Routes() {
	c.router.Post("/v1/login", c.login)
}

func (c *StudentController) login(w http.ResponseWriter, r *http.Request) {
	res := c.responseutil.CreateResponse(w)
	res.JSON(http.StatusOK, nil)
}
