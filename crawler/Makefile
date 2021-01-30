.PHONY: setup install clean

setup:

install: \
	node_modules

node_modules: package-lock.json
	npm install

clean:
	rm -rf node_modules