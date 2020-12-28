import React from "react";
import Layout from "./Layout";
import SongItem from "./SongItem";

const SongList = ({ user, songs, playlists }) => {
    return (
        <Layout user={user}>
            <h1 className="blue-header">Songs</h1>
            <table className="table table-striped nodify-table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Album</th>
                        <th scope="col">Length</th>
                        <th scope="col">Playlists</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map(song => (
                        <SongItem
                            key={song._id}
                            user={user}
                            song={song}
                            playlists={playlists}
                        />
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default SongList;
