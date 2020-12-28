import { Router } from "express";
import { protect } from "../../utils/auth";
import Permissions from "../../utils/permissions";
import {
    listPlaylists,
    createPlaylist,
    deletePlaylist,
    updatePlaylist
} from "./playlist.controllers";

const router = Router();

router.get("/", protect(Permissions.READ_PLAYLISTS), listPlaylists);
router.post("/", protect(Permissions.CREATE_PLAYLIST), createPlaylist);
router.post("/update", protect(Permissions.UPDATE_PLAYLIST), updatePlaylist);
router.post("/delete", protect(Permissions.DELETE_PLAYLIST), deletePlaylist);

export default router;
