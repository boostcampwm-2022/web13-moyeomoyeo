FROM nginx

COPY ./local/nginx.conf /etc/nginx/conf.d

EXPOSE 80
