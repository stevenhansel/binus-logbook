package queue

import (
	"time"

	"github.com/playwright-community/playwright-go"

	"github.com/stevenhansel/binus-logbook/scraper/internal/grpc/proto/result"
)

type QueueConsumer struct {
	queue *Queue
}

func NewConsumer() *QueueConsumer {
	return &QueueConsumer{
		queue: &Queue{},
	}
}

func (c *QueueConsumer) Consume(stream result.ResultListener_ListenServer) error {
	for true {
		time.Sleep(ConsumeSleepDuration)

		if len(c.queue.tasks) == 0 {
			continue
		}

		t := c.queue.Dequeue()

		pw, err := playwright.Run()
		if err != nil {
			return err
		}

		defer pw.Stop()

		headless := true
		browser, err := pw.Chromium.Launch(playwright.BrowserTypeLaunchOptions{
			Headless: &headless,
		})
		if err != nil {
			return err
		}

		defer browser.Close()

		page, err := browser.NewPage()
		if err != nil {
			return err
		}

		for _, task := range t.Tasks {
			_, err := task.Callback(page, t.Metadata)

			reply := &result.Reply{
				Step: task.Step,
				Name: task.Name,
			}
			// TODO: stream result finished
			if err == nil {
				stream.Send(reply)
			} else {
			}
		}
	}

	return nil
}
