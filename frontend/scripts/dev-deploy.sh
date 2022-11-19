#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd frontend

touch .env

echo $4 > .env

docker compose down --rmi all

docker compose up -d