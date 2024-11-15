FROM node:18

LABEL maintainer="martinhoangdev@gmail.com" \
      os="node"


# Bundle app source
COPY . .

EXPOSE 3001


CMD [ "npm", "run", "start"]
