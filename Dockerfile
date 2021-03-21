FROM node:8.10-alpine
RUN npm install
RUN npm install -g bower
RUN bower install
RUN grunt
