.PHONY: install build up down clean

ENVIRONMENT ?= $(shell [ -f .env ] && grep '^ENVIRONMENT=' .env | sed -E 's/ENVIRONMENT=//')

setup: \
	.env \
	docker-comppose.override.yml \
	build

.env:
	touch $@
	echo "ENVIRONMENT=production-pseudo" >> $@
	echo "PORT_PARSER_CHROME=9220" >> $@

docker-comppose.override.yml:
	touch $@

build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

clean: down
	rm -rf docker-compose.override.yml
