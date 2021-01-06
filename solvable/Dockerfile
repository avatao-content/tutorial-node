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

# Prepare the eventhandler in a separate folder
# since /.tutorial is a volume at this point
RUN mkdir /.eventhandler \
    && cp /.tutorial/eventHandlers.js /.eventhandler/eventHandlers.js \
    && npm install @avatao/tfwsdk

VOLUME ["/home/user", "/data/db"]
