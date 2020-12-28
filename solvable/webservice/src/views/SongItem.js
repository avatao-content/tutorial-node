import React from "react";
import config from "../config";

const SongItem = ({ user, song, playlists }) => {
    return (
        <tr>
            <td>{song.name}</td>
            <td>{song.artist}</td>
            <td>{song.album}</td>
            <td>{song.length}mins</td>
            <td>
                <form
                    className="form-inline mx-0 my-0"
                    method="post"
                    action={`${config.baseurl}/songs/${song._id}/add-to-playlist`}
                >
                    <div className="form-group">
                        <label htmlFor="playlist">Add to</label>
                        <div className="">
                            <select
                                name="playlist"
                                className="selectpicker form-control nodify-select"
                                id="playlist"
                                tabIndex="-98"
                            >
                                {playlists.map(playlist => {
                                    return (
                                        <option
                                            value={playlist._id}
                                            key={playlist._id}
                                        >
                                            {playlist.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary ml-3 nodify-play-button">
                            <i className="nodify-play-button-icon"></i>
                        </button>
                    </div>
                </form>
            </td>
        </tr>
    );
};

export default SongItem;
