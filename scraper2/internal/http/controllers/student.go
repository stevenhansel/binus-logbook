package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"github.com/stevenhansel/binus-logbook/scraper/internal/http/responseutil"
	"github.com/stevenhansel/binus-logbook/scraper/internal/student"
)

type StudentServiceQuerier interface {
	Login(email, password string) (*student.Student, error)
}

type StudentController struct {
	router         chi.Router
	responseutil   *responseutil.Responseutil
	studentService StudentServiceQuerier
}

func NewStudentController(router chi.Router, responseutil *responseutil.Responseutil, studentService StudentServiceQuerier) *StudentController {
	return &StudentController{
		router:         router,
		responseutil:   responseutil,
		studentService: studentService,
	}
}

func (c *StudentController) Routes() {
	c.router.Post("/v1/login", c.login)
}

type loginBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginResponse struct {
	Name        string             `json:"name"`
	Email       string             `json:"email"`
	Enrichments []enrichmentObject `json:"enrichments"`
}

type enrichmentObject struct {
	SemesterName              string `json:"semesterName"`
	Track                     string `json:"track"`
	CompanyPartner            string `json:"companyPartner"`
	Position                  string `json:"position"`
	Location                  string `json:"location"`
	WorkingOfficeHours        string `json:"workingOfficeHours"`
	SiteSupervisorName        string `json:"siteSupervisorName"`
	SiteSupervisorEmail       string `json:"siteSupervisorEmail"`
	SiteSupervisorPhoneNumber string `json:"siteSupervisorPhoneNumber"`
	FacultySupervisor         string `json:"facultySupervisor"`
	OfficePhoneNumber         string `json:"officePhoneNumber"`
}

func (c *StudentController) login(w http.ResponseWriter, r *http.Request) {
	res := c.responseutil.CreateResponse(w)

	decoder := json.NewDecoder(r.Body)
	var body loginBody
	err := decoder.Decode(&body)
	if err != nil {
		res.Error4xx(http.StatusBadRequest, "Email and password is required")
		return
	}

	student, err := c.studentService.Login(body.Email, body.Password)
	if err != nil {
		res.Error5xx(err)
		return
	}

	enrichments := make([]enrichmentObject, len(student.Enrichments))
	for i := 0; i < len(enrichments); i++ {
		enrichments[i].SemesterName = student.Enrichments[i].SemesterName
		enrichments[i].Track = student.Enrichments[i].Track
		enrichments[i].CompanyPartner = student.Enrichments[i].CompanyPartner
		enrichments[i].Position = student.Enrichments[i].Position
		enrichments[i].Location = student.Enrichments[i].Location
		enrichments[i].WorkingOfficeHours = student.Enrichments[i].WorkingOfficeHours
		enrichments[i].SiteSupervisorName = student.Enrichments[i].SiteSupervisorName
		enrichments[i].SiteSupervisorEmail = student.Enrichments[i].SiteSupervisorEmail
		enrichments[i].SiteSupervisorPhoneNumber = student.Enrichments[i].SiteSupervisorPhoneNumber
		enrichments[i].FacultySupervisor = student.Enrichments[i].FacultySupervisor
		enrichments[i].OfficePhoneNumber = student.Enrichments[i].OfficePhoneNumber
	}

	res.JSON(http.StatusOK, &loginResponse{
		Name:        student.Name,
		Email:       student.Email,
		Enrichments: enrichments,
	})
}
