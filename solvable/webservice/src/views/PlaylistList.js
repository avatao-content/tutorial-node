import React from "react";
import Layout from "./Layout";
import PlaylistItem from "./PlaylistItem";
import { can } from "../utils/auth";
import Permissions from "../utils/permissions";
import PlaylistForm from "./PlaylistForm";

const PlaylistList = ({ user, playlists }) => {
    return (
        <Layout user={user}>
            <h1 className="blue-header">Playlists</h1>
            <table className="table my-3 nodify-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Private</th>
                        <th scope="col">Songs</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map(playlist => (
                        <PlaylistItem
                            key={playlist._id}
                            user={user}
                            playlist={playlist}
                        />
                    ))}
                </tbody>
            </table>
            {can(user, Permissions.CREATE_PLAYLIST) ? (
                <PlaylistForm user={user} />
            ) : (
                    ""
                )}
        </Layout>
    );
};

export default PlaylistList;
