#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend || exit 1

touch .env

echo -e $4 > .env

echo "create .env"

# docker down
docker compose down --rmi all --remove-orphans

# docker up
docker compose up -d --build