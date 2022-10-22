import express from "express";

import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  removeCollaborator,
  getTasks,
} from "../controllers/project.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getProjects)
  .post(authMiddleware, newProject);

router
  .route("/:id")
  .get(authMiddleware, getProject)
  .put(authMiddleware, editProject)
  .delete(authMiddleware, deleteProject);

router.get("/tasks/:id", authMiddleware, getTasks);
router.post("/collaborator/:id", authMiddleware, addCollaborator);
router.delete("/collaborator/:id", authMiddleware, removeCollaborator);

export default router;
