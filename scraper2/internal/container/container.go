package container

import "go.uber.org/zap"

type Container struct {
	log *zap.Logger
}

func New(log *zap.Logger) *Container {
	return &Container{
		log: log,
	}
}
