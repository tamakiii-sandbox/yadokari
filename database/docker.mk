.PHONY: install clean

install: \
	.env

.env:
	touch $@
	echo "ENVIRONMENT=production-pseudo" >> $@

clean:
	rm .env
