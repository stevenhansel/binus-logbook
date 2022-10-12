package container

import (
	"go.uber.org/zap"

	"github.com/stevenhansel/binus-logbook/scraper/internal/http/responseutil"
	"github.com/stevenhansel/binus-logbook/scraper/internal/student"
)

type Container struct {
	Log            *zap.Logger
	Responseutil   *responseutil.Responseutil
	StudentService *student.StudentService
}

func New(log *zap.Logger, responseutil *responseutil.Responseutil, studentService *student.StudentService) *Container {
	return &Container{
		Log:            log,
		Responseutil:   responseutil,
		StudentService: studentService,
	}
}
