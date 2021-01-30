.PHONY: bash

NAME := loader
ROOT_DIR ?= $(realpath ../..)

bash: $(ROOT_DIR)/docker-compose.yml
	docker-compose --file=$< run --rm $(NAME) $@
