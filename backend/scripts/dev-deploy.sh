#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend

touch .env

echo -e $4 > .env

# 도커 컨테이너 전체 삭제
docker rm `docker ps -a -q`

docker compose up -d --build