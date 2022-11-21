#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend

touch .env

echo $4 > .env

cat .env

docker-compose up -d