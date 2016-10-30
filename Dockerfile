FROM node:7.0.0

RUN mkdir /app
WORKDIR /app
COPY ./ /app

RUN npm i

CMD ["npm", "start"]