FROM node:13.8.0-alpine3.11 AS production-pseudo

RUN apk add --no-cache \
      make \
      bash \
      jq \
      chromium

# --

FROM production-pseudo AS development

RUN apk add --no-cache \
      font-noto \
      font-noto-cjk-extra \
      curl
