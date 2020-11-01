FROM node:lts-alpine3.12
RUN set -euxo pipefail ;\
    apk add --no-cache --update dumb-init

WORKDIR /app

COPY . .

RUN npm install


ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["npm", "start"]