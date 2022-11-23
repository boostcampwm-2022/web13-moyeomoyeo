#!/bin/sh

# 에러를 만나도 무중단으로 명령어 실행
set +e

# 기존의 개발 컨테이너 중지 및 제거
docker stop moyeo-nextjs
docker rm moyeo-nextjs
docker stop moyeo-storybook
docker rm moyeo-storybook

# 이미지 제거
docker rmi moyeo-frontend-dev


# 개발용 이미지 빌드
docker build -t moyeo-frontend-dev -f Dockerfile.development .

# 개발용 컨테이너 실행
docker-compose -f docker-compose.local.yml up -d