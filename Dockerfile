FROM node:latest
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 8001
CMD [ "npm","start" ]