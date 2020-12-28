import React from "react";
import ReactDOMServer from "react-dom/server";

import { User } from "./user.model";
import Profile from "../../views/Profile";
import { newToken } from "../../utils/auth";
import Index from "../../views/Index";
import { ANON_USER } from "../../utils/fixtures";

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const whitelist = ["avatao.com"];
const twoMegabytes = 2 * 1024 * 1024;

export const apiListUsers = async (req, res) => {
    const users = await User.find()
        .lean()
        .exec();
    res.status(200).json(users);
};

export const showProfile = async (req, res) => {
    res.status(200).send(
        ReactDOMServer.renderToString(<Profile user={req.user} />)
    );
};

export const updateProfile = async (req, res, next) => {
    if (req.body.name.length > 20) {
        next(Error(`Username too long: ${req.body.name}`));
    } else if (req.body.age < 0 || req.body.age > 125) {
        next(Error(`Age must be between 0 and 125.`));
    } else if (!emailRegex.test(escape(req.body.email))) {
        next(Error(`Email address is invalid.`));
    } else {
        let userToSave = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            customConfig: req.body.customConfig
        };
        if (req.files && req.files.picture) {
            userToSave.picture = req.files.picture;
        }
        const user = await User.findByIdAndUpdate(req.user._id, userToSave, {
            new: true
        })
            .lean()
            .exec();

        const [key, val] = extractAllowOrigin(req, whitelist);
        res.header(key, val);
        req.session.token = newToken(user);
        res.status(201).send(
            ReactDOMServer.renderToString(
                <Profile
                    user={user}
                    alert={{
                        kind: "info",
                        message: "Profile updated successfully."
                    }}
                />
            )
        );
    }
};

export const deleteProfile = async (req, res, next) => {
    await User.remove({ _id: req.user._id }).exec();
    req.session = null;
    req.user = ANON_USER;
    return res.status(200).send(
        ReactDOMServer.renderToString(
            <Index
                user={ANON_USER}
                alert={{
                    kind: "success",
                    message: "Your profile have been deleted."
                }}
            />
        )
    );
};

const extractAllowOrigin = (req, whitelist) => {
    let allowOrigin = null;
    try {
        const origin = req.header("Origin") || "";
        const n = origin.startsWith("https://") ? 8 : 7;
        allowOrigin = whitelist.includes(origin.substring(n, origin.length))
            ? origin
            : "http://you-are-not-on-the-whitelist.sorry";
    } catch (e) {
        console.debug("Couldn't parse Origin header");
    }
    return ["Access-Control-Allow-Origin", allowOrigin];
};
