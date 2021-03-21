use node:8.10-alpine
RUN npm install
RUN bower install
RUN grunt
