FROM node:20-slim

LABEL maintainer="martinhoangdev@gmail.com" \
      os="node"

COPY . .

RUN npm i

EXPOSE 3001


CMD [ "npm", "run", "start"]
