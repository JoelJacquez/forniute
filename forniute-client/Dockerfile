FROM node:12.2.0-alpine

WORKDIR /usr/src/app

# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . .

EXPOSE 3000 3000

CMD [ "npm", "run", "start"]
