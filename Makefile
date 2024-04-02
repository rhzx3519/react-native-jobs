SHELL=/bin/bash

.PHONY: run

platform = ios
run:
	# NODE_ENV=local 
	yarn $(platform)