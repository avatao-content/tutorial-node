import express from "express";
import { json, urlencoded } from "body-parser";
import config from "./config";
import { login, loginForm, logout, extractUser } from "./utils/auth";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Index from "./views/Index";
import userRouter from "./resources/user/user.router";
import songRouter from "./resources/song/song.router";
import playlistRouter from "./resources/playlist/playlist.router";
import { User } from "./resources/user/user.model";
import { Song } from "./resources/song/song.model";
import cookieSession from "cookie-session";
import { USERS, SONGS } from "./utils/fixtures";
import { apiListPlaylists } from "./resources/playlist/playlist.controllers";
import { apiListUsers } from "./resources/user/user.controllers";
import { apiListSongs } from "./resources/song/song.controllers";
import path from "path";
import { Playlist } from "./resources/playlist/playlist.model";
import fileUpload from "express-fileupload";
import mongoose from "./utils/db";
import { startServer, cookieConfig} from "./utils/serverutils";

export const app = express();

app.disable("x-powered-by");

app.use(
    `/static`,
    express.static(path.join(__dirname, "../static"))
);
app.use(
    cookieSession(cookieConfig())
);
app.use(
    fileUpload({
        limits: { fileSize: 2 * 1024 * 1024 },
        limitHandler: (req, res, next) => {
            next(Error("File too big."));
        }
    })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(extractUser);

const router = express.Router();

router.get("/", (req, res) => {
    return res.send(ReactDOMServer.renderToString(<Index user={req.user} />));
});

router.get("/login", loginForm);
router.get("/logout", logout);
router.post("/login", login);

router.use("/profile", userRouter);
router.use("/songs", songRouter);
router.use("/playlists", playlistRouter);

router.get("/api/playlists/:userId", apiListPlaylists);
router.get("/api/users/", apiListUsers);
router.get("/api/songs/", apiListSongs);

app.use("/", router);

// error handler
app.use((error, req, res, next) => {
    return res.status(500).send(`Something went wrong: ${error.message}`);
});

export const start = async () => {
    try {
        await Promise.all(
            USERS.map(async (user) => {
                await User.create(user);
            })
        );
        await Promise.all(
            SONGS.map(async (song) => {
                await Song.create(song);
            })
        );

        await Song.find().exec(); // we need to "touch" the database in order for previous changes to take effect....
        const songs = await Song.find()
            .lean()
            .exec();
        const user = await User.findOne()
            .lean()
            .exec();

        const privatePlaylist = {
            name: "My Favorites",
            private: true,
            createdBy: user,
            songs: [songs[2]._id, songs[3]._id, songs[6]._id]
        };
        await Playlist.create(privatePlaylist);
        const publicPlaylist = {
            name: "Work Music",
            private: false,
            createdBy: user,
            songs: [songs[12]._id, songs[15]._id, songs[18]._id]
        };
        await Playlist.create(publicPlaylist);

        return startServer(app, mongoose);
    } catch (e) {
        console.error(e);
    }
};
