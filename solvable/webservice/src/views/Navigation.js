import React from "react";
import Permissions from "../utils/permissions";
import { can } from "../utils/auth";
import config from "../config";

const Navigation = ({ user }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark nodify-navbar mb-4">
            <div className="container">
                <div className="navbar">
                    <img src={`${config.baseurl}/static/images/volume_icon.png`} className="volume-icon" />
                    <a href={`${config.baseurl}/`} className="nav-link nodify-header">
                        Nodify
                    </a>
                    <ul className="ul navbar-nav navbar-expand">
                        {can(user, Permissions.READ_SONGS) ? (
                            <li className="nav-item pr-3">
                                <a href={`${config.baseurl}/songs`} className="nav-link">
                                    Songs
                                </a>
                            </li>
                        ) : (
                                ""
                            )}
                        {can(user, Permissions.READ_PLAYLISTS) ? (
                            <li className="nav-item">
                                <a href={`${config.baseurl}/playlists`} className="nav-link">
                                    Playlists
                                </a>
                            </li>
                        ) : (
                                ""
                            )}
                    </ul>
                </div>
                <div className="nav navbar-expand navbar-right">
                    {can(user, Permissions.READ_PROFILE) ? (
                        <a href={`${config.baseurl}/profile`} className="nav-link">
                            Profile
                        </a>
                    ) : (
                            ""
                        )}
                    {can(user, Permissions.LOG_OUT) ? (
                        <a href={`${config.baseurl}/logout`} className="nav-link nodify-navbar-right">
                            Log out
                        </a>
                    ) : (
                            ""
                        )}
                    {can(user, Permissions.LOG_IN) ? (
                        <div className="nav navbar-nav navbar-right">
                            <a href={`${config.baseurl}/login`} className="nav-link nodify-navbar-right">
                                Log in
                            </a>
                        </div>
                    ) : (
                            ""
                        )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
