# node 16.18.1 이미지 사용
FROM node:16.18.1-alpine

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json, package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 프로젝트의 모든 파일 복사
COPY . .

# 이미지 빌드시 환경 변수 주입 사용
RUN touch .env
RUN echo -e "API_URL=https://api.moyeomoyeo.com\\nNEXT_PUBLIC_API_URL=https://api.moyeomoyeo.com" > .env

# Build NextJS app
RUN npm run build

# 3000 포트 개방
EXPOSE 3000