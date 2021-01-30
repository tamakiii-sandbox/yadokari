.PHONY: help fetch

URL :=

hostname = node ../src/url_parse.js '$1' --hostname
pathname = node ../src/url_parse.js '$1' --pathname
search = node ../src/url_parse.js '$1' --search
encode = node ../src/url_encode.js

help:
	@cat $(firstword $(MAKEFILE_LIST))

fetch:
	echo dist/fetch/$(shell $(call hostname,$(URL)))$(shell $(call pathname,$(URL)))$(shell $(call search,$(URL)) | $(call encode))

dist/fetch/%: | dist/fetch
	mkdir -p $(dir $@)
	node ../src/fetch.js $(URL) > $@

dist/fetch: dist
	mkdir -p $@

dist:
	mkdir -p $@