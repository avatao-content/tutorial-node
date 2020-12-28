import mongoose from "../../utils/db";

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        age: {
            type: Number,
            required: true,
            trim: true
        },
        picture: { data: Buffer, mimetype: String, name: String },
        customConfig: {
            type: String
        },
        permissions: {
            type: String,
            required: true
        },
        playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }]
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
