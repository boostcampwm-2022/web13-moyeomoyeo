#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend

touch .env

cat << EOF $4 
EOF 
>> .env

docker-compose up -d