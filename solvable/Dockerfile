FROM avatao/tutorial:ragdoll-20201201

ENV TFW_WEBSERVICE_DIR=/home/user/webservice

COPY solvable/webservice ${TFW_WEBSERVICE_DIR}
COPY solvable/supervisor /etc/supervisor

RUN apt-get update -yq \
    && apt-get -yq install curl gnupg ca-certificates \
    && curl -L https://deb.nodesource.com/setup_12.x | bash \
    && apt-get update -yq \
    && apt-get install -yq nodejs

RUN cd ${TFW_WEBSERVICE_DIR} && npm install

# Prepare the eventhandler in a separate folder
# since /.tutorial is a volume at this point
RUN mkdir /.eventhandler \
    && cp /.tutorial/eventHandlers.js /.eventhandler/eventHandlers.js \
    && npm install @avatao/tfwsdk

VOLUME ["/home/user"]
