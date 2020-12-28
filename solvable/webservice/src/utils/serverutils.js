import config from "../config"
import https from "https";
import fs from "fs";

export const startServer = async (app, mongoose) => {
     let server;
    if (config.secure) {
        const options = {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem")
        };
        server = https.createServer(options, app).listen(config.port, () => {
            process.on("exit", async () => {
                console.debug("Exiting process");
                await mongoose.disconnect();
            });
        });
    } else {
        server = app.listen(config.port, () => {
            process.on("exit", async () => {
                console.debug("Exiting process");
                await mongoose.disconnect();
            });
        });
    }
    return server; 
}

export const cookieConfig = () => {
    let result;
    if (config.secure) {
        result = {
            name: "session",
            secret: config.secrets.cookie,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        };
    } else {
        result = {
            name: "session",
            secret: config.secrets.cookie,
            maxAge: 24 * 60 * 60 * 1000
        }
    }
    console.log(result);
    return result;
}
