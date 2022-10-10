package container

import (
	"go.uber.org/zap"

	"github.com/stevenhansel/binus-logbook/scraper/internal/http/responseutil"
)

type Container struct {
	Log          *zap.Logger
	Responseutil *responseutil.Responseutil
}

func New(log *zap.Logger, responseutil *responseutil.Responseutil) *Container {
	return &Container{
		Log:          log,
		Responseutil: responseutil,
	}
}
