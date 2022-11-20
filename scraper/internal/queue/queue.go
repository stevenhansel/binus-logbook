package queue

import (
	"sync"
	"time"

	"github.com/stevenhansel/binus-logbook/scraper/internal/models"
)

const ConsumeSleepDuration = time.Duration(500 * time.Millisecond)

type Queue struct {
	mu    sync.Mutex
	tasks []*models.Task
}

func (q *Queue) Enqueue(task *models.Task) {
	q.mu.Lock()
	defer q.mu.Unlock()

	q.tasks = append(q.tasks, task)
}

func (q *Queue) Dequeue() *models.Task {
	q.mu.Lock()
	defer q.mu.Unlock()

	t := q.tasks[0]

	if len(q.tasks) > 1 {
		q.tasks = q.tasks[1:]
	} else {
		q.tasks = []*models.Task{}
	}

	return t
}
