FROM rust:1.41.0-alpine3.11 AS production-pseudo

RUN apk add --no-cache make bash git && \
    sed -i -e 's|/bin/ash|/bin/bash|' /etc/passwd

# --

FROM production-pseudo AS development

ENV RUSTFLAGS -C target-feature=-crt-static

RUN apk add --no-cache --virtual .builddeps \
      musl-dev \
      openssl-dev \
      && \
    apk add --no-cache \
      bind-tools \
      mysql-client \
      && \
    rustup toolchain add nightly && \
    rustup component add \
      rustfmt  \
      rust-analysis \
      rust-src \
      rls \
      && \
    true
