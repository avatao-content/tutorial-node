FROM avatao/tutorial:ragdoll-20201201

ENV TFW_WEBSERVICE_DIR=/home/user/webservice
ENV SDKTEST=true

COPY solvable/webservice $TFW_WEBSERVICE_DIR
COPY solvable/supervisor /etc/supervisor

RUN apt-get update -yq \
    && apt-get -yq install curl gnupg ca-certificates \
    && curl -L https://deb.nodesource.com/setup_12.x | bash \
    && apt-get update -yq \
    && apt-get install -yq \
        dh-autoreconf=19 \
        ruby=1:2.5.* \
        ruby-dev=1:2.5.* \
        nodejs

RUN cd ${TFW_WEBSERVICE_DIR} && npm install
RUN ln -s ${TFW_WEBSERVICE_DIR}/node_modules /.tutorial/node_modules

VOLUME ["/home/user"]
