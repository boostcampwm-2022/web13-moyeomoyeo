#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend || exit 1

touch .env

echo -e $4 > .env

echo "create .env"

EXIST_BLUE=$(docker-compose -p moyeo-server-blue -f docker-compose.dev.blue.yml ps | grep Up)
echo "$EXIST_BLUE"

if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker-compose -p moyeo-server-blue -f docker-compose.dev.blue.yml up -d --build
    BEFORE_COMPOSE="green"
    AFTER_COMPOSE="blue"
else
    echo "green up"
    docker-compose -p moyeo-server-green -f docker-compose.dev.green.yml up -d --build
    BEFORE_COMPOSE="blue"
    AFTER_COMPOSE="green"
fi

sleep 10
 
EXIST_AFTER=$(docker-compose -p moyeo-server-${AFTER_COMPOSE} -f docker-compose.dev.${AFTER_COMPOSE}.yml ps | grep Up)

if [ -n "$EXIST_AFTER" ]; then
  echo "$AFTER_COMPOSE nginx setting"
#   docker cp nginx/dev/bluegreen/nginx.${AFTER_COMPOSE}.conf moyeo-nginx:/etc/nginx/conf.d/nginx.conf
  docker exec -it moyeo-nginx nginx -s reload
 
  docker-compose -p moyeo-server-${BEFORE_COMPOSE} -f docker-compose.dev.${BEFORE_COMPOSE}.yml down
  echo "$BEFORE_COMPOSE down"
fi