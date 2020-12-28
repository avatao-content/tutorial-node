import { Router } from "express";
import { showProfile, updateProfile, deleteProfile } from "./user.controllers";
import { protect } from "../../utils/auth";
import Permissions from "../../utils/permissions";

const router = Router();

router.get("/", protect(Permissions.READ_PROFILE), showProfile);
router.post("/", protect(Permissions.UPDATE_PROFILE), updateProfile);
router.get(
    "/delete/:userId",
    protect(Permissions.DELETE_PROFILE),
    deleteProfile
);

export default router;
