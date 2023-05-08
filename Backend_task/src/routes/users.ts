import { Router } from "express";
import {userDetail} from "../controller/usersController"
import { upload } from "../controller/preview.controller"
import { previewImg } from "../controller/preview.controller"

const router: Router = Router();

router.post("/register", userDetail)
router.post("/preview", upload, previewImg)

export default router;