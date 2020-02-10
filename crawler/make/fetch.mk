.PHONY: help fetch

URL :=
TARGET := $(shell mktemp -u)

fetch: $(TARGET)

$(TARGET):
	node src/fetch.js $(URL) > $(TARGET)

help:
	cat $(lastword $(MAKEFILE_LIST))
