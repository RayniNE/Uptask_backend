import express from "express";

import {
  signUp,
  authenticate,
  confirmUser,
  forgotPassword,
  verifyToken,
  changePassword,
  userProfile,
} from "../controllers/user.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/", signUp);
router.post("/login", authenticate);
router.get("/confirm/:token", confirmUser);
router.post("/forgotpassword", forgotPassword);
// * This way we can group different HTTP methods under the same route
router.route("/forgotpassword/:token").get(verifyToken).post(changePassword);
router.get("/profile", authMiddleware, userProfile);

export default router;
