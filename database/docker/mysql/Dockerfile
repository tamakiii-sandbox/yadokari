FROM mysql:5.7.12 as production-pseudo

COPY ./etc/my.cnf /etc/my.cnf

# --

FROM production-pseudo as development
