.PHONY: bash

DIR := $(realpath $(dir $(lastword $(MAKEFILE_LIST)))/../..)
NAME := parser

ENV := $(DIR)/.env
PORT_CHROME := $(shell [ -f $(ENV) ] && grep '^PORT_PARSER_CHROME=' $(ENV) | sed -E 's/PORT_PARSER_CHROME=//')
PORT_CHROME_INSIDE := 9220

bash: $(ROOT_DIR)/docker-compose.yml
	docker-compose --file=$< run --rm -p $(PORT_CHROME):$(PORT_CHROME_INSIDE) $(NAME) $@
