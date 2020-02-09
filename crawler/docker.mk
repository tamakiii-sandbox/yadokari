.PHONY: install clean

ENVIRONMENT := $(shell [ -f .evn ] && grep '^ENVIRONMENT=' .env | sed -E 's/ENVIRONMENT=//')

install: \
	.env \
	docker-comppose.override.yml \
	build

.env:
	touch $@
	echo "ENVIRONMENT=production-pseudo" >> $@

docker-comppose.override.yml:
	touch $@

build:
	docker-compose build

clean:
	#
