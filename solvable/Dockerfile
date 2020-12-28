FROM avatao/tutorial:ragdoll-20201201

# Install Node
RUN apt-get update -yq \
    && apt-get -yq install curl gnupg ca-certificates wget \
    && curl -L https://deb.nodesource.com/setup_12.x | bash \
    && apt-get update -yq \
    && apt-get install -yq nodejs

# Install Mongodb and add mongodb user
RUN cd /tmp \
    && wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-debian10-4.4.2.tgz \
    && tar -zxvf mongodb-linux-*-4.4.2.tgz \
    && cp /tmp/mongodb-linux-x86_64-debian10-4.4.2/bin/* /usr/local/bin/ \
    && useradd -ms /bin/bash mongodb

ENV TFW_WEBSERVICE_DIR=/home/user/webservice

COPY solvable/supervisor /etc/supervisor
COPY solvable/webservice ${TFW_WEBSERVICE_DIR}

RUN cd ${TFW_WEBSERVICE_DIR} && npm install \
    && cd ${TFW_WEBSERVICE_DIR} && npm run build \
    && mkdir -p /data/db \
    && chown -R mongodb:mongodb /data/db

# Symlink node_modules for the Node TFW SDK
RUN ln -s ${TFW_WEBSERVICE_DIR}/node_modules /.tutorial/node_modules

VOLUME ["/home/user", "/data/db"]
