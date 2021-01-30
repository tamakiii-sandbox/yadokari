.PHONY: help parse

FILE :=
TARGET := $(shell mktemp -u)

parse: $(TARGET)

$(TARGET): $(FILE)
	cat $(FILE) | node src/parse.js > $(TARGET)

help:
	cat $(lastword $(MAKEFILE_LIST))
