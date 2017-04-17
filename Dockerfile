
FROM mhart/alpine-node:6.10.2

COPY package.json /tmp/package.json

RUN cd /tmp && npm install

RUN mkdir /app & cp -a /tmp/node_modules /app/

COPY . /app/

WORKDIR /app

EXPOSE 5000

CMD ["npm", "start"]
