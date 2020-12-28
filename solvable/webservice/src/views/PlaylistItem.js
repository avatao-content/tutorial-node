import React from "react";
import config from "../config";

const PlaylistItem = ({ user, playlist }) => {
    return (
        <tr>
            <td>{playlist.name}</td>
            <td>
                <form
                    method="POST"
                    action={`${config.baseurl}/playlists/update`}
                    className="my-0 mx-0 form-inline"
                >
                    <input type="hidden" name="id" value={playlist._id} />
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="private"
                            checked={playlist.private}
                        />

                        <button type="submit" className="p-1 nodify-update-button ">
                            Update
                        </button>
                    </div>
                </form>
            </td>
            <td>
                {playlist.songs.map(song => {
                    return (
                        <span key={song._id} className="badge badge-info p-2 mr-2">
                            {song.name}
                        </span>
                    );
                })}
            </td>
            <td>
                <form
                    method="POST"
                    action={`${config.baseurl}/playlists/delete`}
                    className="my-0 mx-0"
                >
                    <input type="hidden" name="id" value={playlist._id} />
                    <button type="submit" className="btn btn-sm btn-danger nodify-button-red">
                        Delete
                    </button>
                </form>
            </td>
        </tr>
    );
};

export default PlaylistItem;
