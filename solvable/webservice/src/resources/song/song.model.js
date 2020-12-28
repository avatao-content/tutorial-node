import mongoose from "../../utils/db";

const songSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50
        },
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: true
        },
        length: Number
    },
    { timestamps: true }
);

export const Song = mongoose.model("Song", songSchema);
