From nginx:stable

MAINTAINER lalaze

COPY default.conf /etc/nginx/conf.d/default.conf 

COPY build/ /usr/share/nginx/html/

EXPOSE 80

