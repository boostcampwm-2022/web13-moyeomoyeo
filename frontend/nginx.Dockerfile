FROM nginx:alpine

# 이미지 존재하는 config 파일들 미리 제거
RUN rm /etc/nginx/conf.d/*

# nginx.conf 파일 복사
COPY nginx.conf /etc/nginx/conf.d

# 80포트 개방
EXPOSE 80