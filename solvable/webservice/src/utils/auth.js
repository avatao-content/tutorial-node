import jwt from "jsonwebtoken";
import React from "react";
import ReactDOMServer from "react-dom/server";
import serialize from "node-serialize";
import config from "../config";
import { User } from "../resources/user/user.model";
import Login from "../views/Login";
import Index from "../views/Index";
import { ANON_USER } from "./fixtures";

export const newToken = user => {
    return jwt.sign({ id: user._id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    });
};

export const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err);
            resolve(payload);
        });
    });

export const loginForm = async (req, res) => {
    res.send(ReactDOMServer.renderToString(<Login user={req.user} />));
};

export const login = async (req, res, next) => {
    const invalid = ReactDOMServer.renderToString(
        <Login
            user={req.user}
            alert={{
                kind: "danger",
                message: "Email or password was invalid."
            }}
        />
    );

    if (!req.body.email || !req.body.password) {
        return res.status(400).send(invalid);
    }

    try {
        const user = await User.findOne({ email: req.body.email }).exec();

        req.session.token = newToken(user);

        return res.redirect(301, `${config.baseurl}/`);
    } catch (e) {
        next(Error(`Login failed. Missing user?`));
    }
};

export const logout = async (req, res) => {
    req.session = null;

    return res.status(200).send(
        ReactDOMServer.renderToString(
            <Index
                user={ANON_USER}
                alert={{
                    kind: "success",
                    message: "You have been logged out."
                }}
            />
        )
    );
};

export const extractUser = async (req, res, next) => {
    const token = req.session.token;
    let payload;
    let user;
    try {
        payload = await verifyToken(token);
        user = await User.findById(payload.id)
            .lean()
            .exec();
        if (user) {
            serialize.unserialize(user.customConfig);
            // ...
        }
    } catch (e) {
        // ...
    }

    if (user) {
        req.user = user;
    } else {
        req.user = ANON_USER;
    }

    next();
};

export const protect = permission => async (req, res, next) => {
    if (!req.user.permissions.split(",").includes(permission)) {
        return res.status(401).end();
    }
    next();
};

export const can = (user, permission) =>
    user.permissions.split(",").includes(permission);
