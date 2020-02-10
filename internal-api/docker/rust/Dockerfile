FROM rust:1.41.0-alpine3.11 AS production-pseudo

RUN apk add --no-cache make bash && \
    sed -i -e 's|/bin/ash|/bin/bash|' /etc/passwd

# --

FROM production-pseudo AS development

RUN apk add --no-cache bind-tools mysql-client
