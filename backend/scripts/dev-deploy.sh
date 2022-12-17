#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend || exit 1

touch .env

echo -e $4 > .env

echo "create .env"

RUNNING_APPLICATION=$(docker ps | grep moyeo-server-blue)
DEFAULT_CONF="nginx/default.conf"

if [ "$RUNNING_APPLICATION"  ];then
	echo "green Deploy..."
	docker-compose pull moyeo-server-green
	docker-compose up -d moyeo-server-green
	
	while [ 1 == 1 ]; do
		echo "green health check...."
		REQUEST=$(docker exec moyeo-nginx curl http://moyeo-server-green:3000)
		echo $REQUEST
		if [ -n "$REQUEST" ]; then
			break ;
		fi
		sleep 3
	done;
	
	sed -i 's/moyeo-server-blue/moyeo-server-green/g' $DEFAULT_CONF
	docker exec moyeo-nginx service nginx reload
	docker-compose stop moyeo-server-blue
else
	echo "blue Deploy..."
	docker-compose pull moyeo-server-blue
    docker-compose up -d moyeo-server-blue
	
	while [ 1 == 1 ]; do
		echo "blue health check...."
                REQUEST=$(docker exec moeyo-nginx curl http://moyeo-server-blue:3000)
                echo $REQUEST
		if [ -n "$REQUEST" ]; then
            break ;
        fi
		sleep 3
    done;
	
	sed -i 's/moyeo-server-green/moyeo-server-blue/g' $DEFAULT_CONF
    docker exec moyeo-nginx service nginx reload
	docker-compose stop moyeo-server-green
fi