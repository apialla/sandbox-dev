FROM node:alpine
RUN mkdir -p /usr/src/app
COPY package*.json /usr/src/app
COPY . /usr/src/app
# WORKDIR should be followed by RUN npm i as COPY commmand
# overriding WORKDIR behvaior (by changing the current directory)
WORKDIR /usr/src/app
RUN npm i
CMD [ "npm","run","start"]