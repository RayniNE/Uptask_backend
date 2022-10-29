import express from "express";

import {
  addTask,
  getTask,
  deleteTask,
  updateTask,
  changeState,
} from "../controllers/task.js";

import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authMiddleware, addTask);
router
  .route("/:id")
  .get(authMiddleware, getTask)
  .put(authMiddleware, updateTask)
  .delete(authMiddleware, deleteTask);
router.post("/state/:id", authMiddleware, changeState);

export default router;
