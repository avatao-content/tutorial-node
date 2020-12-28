import React from "react";
import Layout from "./Layout";
import Alert from "./Alert";
import { can } from "../utils/auth";
import Permissions from "../utils/permissions";
import config from "../config";

const Profile = ({ alert, user }) => {
    return (
        <Layout user={user}>
            {alert ? <Alert {...alert} /> : ""}
            <div className="">
                <h3 className="nodify-login-header">Profile</h3>
                <div>
                    {user.picture ? (
                        <img
                            src={`data:${
                                user.picture.mimetype
                                };base64,${user.picture.data.toString("base64")}`}
                        />
                    ) : (
                            ""
                        )}
                    <form
                        action={`${config.baseurl}/profile`}
                        method="post"
                        encType="multipart/form-data"
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email" className="nodify-login-label">Email</label>
                                <input
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    defaultValue={user.email}
                                />

                                <label htmlFor="name" className="nodify-login-label">Name</label>
                                <input
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    defaultValue={user.name}
                                />

                                <label htmlFor="age" className="nodify-login-label">Age</label>
                                <input
                                    className="form-control"
                                    id="age"
                                    name="age"
                                    defaultValue={user.age}
                                />

                                <label htmlFor="picture" className="nodify-login-label">Picture URL</label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="picture"
                                        name="picture"
                                        defaultValue={
                                            user.picture ? user.picture : ""
                                        }
                                    />
                                    <label
                                        htmlFor="picture"
                                        className="custom-file-label"
                                    >
                                        Picture
                                    </label>
                                </div>


                                <label htmlFor="email" className="nodify-login-label">Custom Config</label>
                                <textarea
                                    className="form-control"
                                    id="customConfig"
                                    name="customConfig"
                                    rows={5}
                                    defaultValue={user.customConfig}
                                />

                                <button type="submit" className="nodify-submit-button-light">
                                    Go
                                </button>
                                {can(user, Permissions.DELETE_PROFILE) ? (
                                    <a
                                        className="btn btn-danger"
                                        href={`${config.baseurl}/profile/delete/${user._id}`}
                                    >
                                        Delete Profile
                                    </a>
                                ) : (
                                        ""
                                    )}
                            </div>


                            <div className="form-group col-md-6">
                                <img src={`${config.baseurl}/static/images/promo-1.jpg`} className="nodify-promo-picture" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout >
    );
};

export default Profile;
