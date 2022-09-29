import express from "express";

import { signUp, authenticate } from "../controllers/user.js";

const router = express.Router();

router.post("/", signUp);
router.post("/login", authenticate);

export default router;
