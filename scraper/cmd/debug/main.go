package main

import (
	"fmt"

	"github.com/stevenhansel/binus-logbook/scraper/internal/binus"
)

func main() {

	binus := binus.New()
	student, err := binus.Login("steven.hansel@binus.ac.id", "Dragonfire55")

	fmt.Println("student: ", student)
  fmt.Println("err: ", err)
}
