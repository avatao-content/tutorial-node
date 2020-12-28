import mongoose from "../../utils/db";

const Schema = mongoose.Schema;

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },
        private: {
            type: Boolean,
            required: true
        },
        createdBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        songs: [{ type: Schema.Types.ObjectId, ref: "Song" }]
    },
    { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
