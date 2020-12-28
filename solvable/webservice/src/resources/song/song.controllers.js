import React from "react";
import ReactDOMServer from "react-dom/server";
import SongList from "../../views/SongList";
import { Song } from "./song.model";
import { Playlist } from "../playlist/playlist.model";
import config from "../../config";

export const apiListSongs = async (req, res) => {
    const songs = await Song.find()
        .lean()
        .exec();
    res.status(200).json(songs);
};

export const listSongs = async (req, res) => {
    res.status(200).send(
        ReactDOMServer.renderToString(
            <SongList
                user={req.user}
                songs={
                    await Song.find()
                        .lean()
                        .exec()
                }
                playlists={
                    await Playlist.find({ createdBy: req.user._id })
                        .lean()
                        .exec()
                }
            />
        )
    );
};

export const updatePlaylist = async (req, res) => {
    const songs = [await Song.findById(req.params.songId)];

    await Playlist.update(
        { _id: req.body.playlist },
        { $push: { songs: { $each: songs } } }
    );

    res.redirect(301, `${config.baseurl}/songs`);
};
