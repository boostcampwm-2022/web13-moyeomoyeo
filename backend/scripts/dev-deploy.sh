#!/bin/bash

rm -rf web13-moyeomoyeo

git clone git@github.com:boostcampwm-2022/web13-moyeomoyeo.git

cd web13-moyeomoyeo/backend

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

docker-compose up -d