.PHONY: install clean

ENVIRONMENT := $(shell [ -f .evn ] && grep '^ENVIRONMENT=' .env | sed -E 's/ENVIRONMENT=//')

install: \
	.env \
	build

.env:
	touch $@
	echo "ENVIRONMENT=production-pseudo" >> $@

build:
	docker-compose build

clean:
	#
