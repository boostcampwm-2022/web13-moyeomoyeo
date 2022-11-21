FROM nginx

COPY ./nginx/local/nginx.conf /etc/nginx/conf.d

EXPOSE 80
