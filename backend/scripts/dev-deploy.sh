#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend

touch .env.development

echo -e $4 > .env.development

# docker down
docker compose --env-file .env.development down

# 도커 컨테이너 전체 삭제
# docker rm `docker ps -a -q`

# 도커 이미지 전체 삭제
docker rmi `docker images -q`

docker compose --env-file .env.development up -d --build