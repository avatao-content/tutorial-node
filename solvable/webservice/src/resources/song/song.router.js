import { Router } from "express";
import { listSongs, updatePlaylist } from "./song.controllers";
import { protect } from "../../utils/auth";
import Permissions from "../../utils/permissions";

const router = Router();

router.get("/", protect(Permissions.READ_SONGS), listSongs);

router.post(
    "/:songId/add-to-playlist",
    protect(Permissions.UPDATE_PLAYLIST),
    updatePlaylist
);

export default router;
