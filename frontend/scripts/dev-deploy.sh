#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker has been logged in"

cd frontend

touch .env

echo $4 > .env

# docker down
docker compose down

# 도커 컨테이너 전체 삭제
docker rm `docker ps -a -q`

chmod +x ./init-letsencrypt.sh

./init-letsencrypt.sh

docker compose up -d