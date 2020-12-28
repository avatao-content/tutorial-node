import React from "react";
import config from "../config";

const PlaylistForm = ({ user }) => {
    return (
        <div>
            <h1 className="blue-header">Create Playlist</h1>
            <div>
                <form action={`${config.baseurl}/playlists`} method="post">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name" className="nodify-login-label">Name</label>
                            <input
                                className="form-control nodify-login-inputbox"
                                id="name"
                                name="name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input
                                className="nodify-checkbox"
                                type="checkbox"
                                id="private"
                                name="private"
                            />
                            <label
                                htmlFor="private"
                                className="nodify-login-label pl-2"
                            >
                                Private
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="nodify-submit-button-light">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlaylistForm;
