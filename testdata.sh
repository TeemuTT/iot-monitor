#!/bin/bash

HOST="localhost"
PORT=8081

while getopts "h:p:" opt; do
	case "$opt" in
		h) HOST=$OPTARG ;;
		p) PORT=$OPTARG ;;
	esac
done

while true; do
	value=$(((RANDOM % 15) + 20))

	curl -XPOST -H "Content-Type: application/json" -d '{"device_id": 123, "device_description": "rpi_home", "value": '$value', "value_description": "room1_temperature"}' http://$HOST:$PORT/data

	sleep 1m
done