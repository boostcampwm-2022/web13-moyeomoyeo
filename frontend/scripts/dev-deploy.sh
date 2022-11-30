#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker has been logged in"

cd frontend

touch .env.production

echo -e $4 > .env.production

# docker down
docker compose down --rmi all --remove-orphans

docker compose up -d --build