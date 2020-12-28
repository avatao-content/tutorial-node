const env = process.env.NODE_ENV || "development";

const config = {
    env,
    secure: process.env.SECURE || false,
    port: process.env.PORT || 11111,
    baseurl: process.env.BASEURL || "/",
    module: process.env.MODULE || null,
    secrets: {
        cookie: process.env.COOKIE_SECRET || "test",
        jwt: process.env.JWT_SECRET || "test",
        jwtExp: "100d"
    }
};

config.generateUrl = (path) => {
    return `${config.secure ? "https://" : "http://"}localhost:${config.port}${path}`
}

export default config;
