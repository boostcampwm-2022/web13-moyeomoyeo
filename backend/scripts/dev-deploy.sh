#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend

docker-compose up -d