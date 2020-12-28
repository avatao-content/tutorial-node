import config from "./config";

const server = require(config.module ? `./${config.module}/server` : "./server");

const init = async () => {
    server.start();
};

init();
