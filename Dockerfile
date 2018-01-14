FROM  edse/ubuntu-nginx-mysql-php-nodejs:latest

RUN echo "nameserver 8.8.8.8" | tee /etc/resolv.conf > /dev/null

RUN apt-get update

RUN service mysql start && mysql -e "create database crypto_values"

RUN mkdir -p /tmp/node
WORKDIR /tmp/node
ENV NODE_VERSION 6.11.2
RUN curl -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" \
    && tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 \
    && rm "node-v$NODE_VERSION-linux-x64.tar.gz" \
    && rm -rf /tmp/*

# Create app directory
RUN         mkdir -p /srv/app
WORKDIR         /srv/app

COPY package.json /srv/app
RUN npm install

COPY . /srv/app

RUN ./node_modules/.bin/bower install --allow-root

RUN service mysql start && npm run migrate-local

CMD ["service", "mysql", "start"]
CMD ["npm","run", "local-start"]
