import React from "react";
import ReactDOMServer from "react-dom/server";
import { Playlist } from "./playlist.model";
import PlaylistList from "../../views/PlaylistList";
import config from "../../config";

export const apiListPlaylists = async (req, res) => {
    const playlists = await Playlist.find({
        createdBy: req.params.userId,
        private: false
    })
        .populate("songs")
        .lean()
        .exec();
    res.status(200).json(playlists);
};

export const listPlaylists = async (req, res) => {
    const playlists = await Playlist.find({ createdBy: req.user._id })
        .populate("songs")
        .lean()
        .exec();
    res.status(200).send(
        ReactDOMServer.renderToString(
            <PlaylistList user={req.user} playlists={playlists} />
        )
    );
};

export const createPlaylist = async (req, res) => {
    const isPrivate = req.body.private === "on";
    await Playlist.create({
        name: req.body.name,
        private: isPrivate,
        songs: [],
        createdBy: req.user._id
    });

    res.redirect(301, `${config.baseurl}/playlists`);
};

export const updatePlaylist = async (req, res) => {
    await Playlist.findByIdAndUpdate(
        req.body.id,
        { private: req.body.private === "on" },
        {
            new: true
        }
    )
        .lean()
        .exec();
    res.redirect(301, `${config.baseurl}/playlists`);
};

export const deletePlaylist = async (req, res) => {
    await Playlist.deleteOne({
        _id: req.body.id
    });
    res.redirect(301, `${config.baseurl}/playlists`);
};
