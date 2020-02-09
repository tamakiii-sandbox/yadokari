.PHONY: install clean

ENVIRONMENT := $(shell [ -f .env ] && grep '^ENVIRONMENT=' .env | sed -E 's/ENVIRONMENT=//')

install: \
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

clean:
	#
