package models

import (
	"sync"

	"github.com/playwright-community/playwright-go"
)

type Task struct {
	Title    string
	Tasks    []*Subtask
	Metadata *Metadata
}

type Subtask struct {
	Step     int32
	Name     string
	Callback func(page playwright.Page, metadata *Metadata) (interface{}, error)
}

type Metadata struct {
	mtx  sync.Mutex
	data map[string]interface{}
}

func (m *Metadata) Get(key string) interface{} {
	m.mtx.Lock()
	defer m.mtx.Unlock()

	return m.data[key]
}

func (m *Metadata) Set(key string, value interface{}) {
	m.mtx.Lock()
	defer m.mtx.Unlock()

	m.data[key] = value
}

type ResultStream struct{}
