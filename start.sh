#!/bin/bash

(cd back && go run main.go) &

(cd front && pnpm dev) &

wait
