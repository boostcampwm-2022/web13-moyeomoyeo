FROM nginx

COPY ./nginx/prod/nginx.conf /etc/nginx/conf.d

EXPOSE 80
