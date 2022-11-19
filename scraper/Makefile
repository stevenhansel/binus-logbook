dist := bin/api
arch = $(shell rustc -Vv | grep host | cut -f2 -d' ')

.PHONY: run
run:
	go run cmd/api/*.go

.PHONY: build
build:
	go build -o $(addsuffix $(arch), $(dist)-) cmd/api/*.go
