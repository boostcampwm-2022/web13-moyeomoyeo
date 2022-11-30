#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker has been logged in"

cd frontend

touch .env
touch .env.production

echo -e $4 > .env

echo -e API_URL=https://api.moyeomoyeo.com\\nNEXT_PUBLIC_API_URL=https://api.moyeomoyeo.com > .env.production

cat .env.production

# docker down
docker compose down --rmi all --remove-orphans

docker compose up -d --build