import Project from "../models/Project.js";

const getProjects = async (req, res) => {
  const { user } = req;
  const projects = await Project.find().where("creator").equals(user);

  res.json(projects);
};

const newProject = async (req, res) => {
  const { body, user } = req;
  const project = new Project(body);
  project.creator = user._id;

  try {
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    const err = new Error("Ha ocurrido un error");
    res.status(500).json({ message: err.message });
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const project = await Project.findById(id);

    if (!project) {
      const error = new Error("Projecto no encontrado");
      res.status(404).json({ message: error.message });
      return;
    }

    if (user._id.toString() !== project.creator.toString()) {
      const error = new Error("Acción no válida");
      res.status(401).json({ message: error.message });
      return;
    }

    res.json(project);
  } catch (error) {
    console.log(error);
    const err = new Error("Ha ocurrido un error");
    res.status(500).json({ message: err.message });
  }
};

const editProject = async (req, res) => {
  const { id } = req.params;
  const { user, body } = req;

  try {
    const project = await Project.findById(id);

    if (!project) {
      const error = new Error("Projecto no encontrado");
      res.status(404).json({ message: error.message });
      return;
    }

    if (user._id.toString() !== project.creator.toString()) {
      const error = new Error("Acción no válida");
      res.status(401).json({ message: error.message });
      return;
    }

    project.name = body.name || project.name;
    project.description = body.description || project.description;
    project.dueDate = body.dueDate || project.dueDate;
    project.client = body.client || project.client;

    await project.save();

    res.status(202).json(null);
  } catch (error) {
    console.log(error);
    const err = new Error("Ha ocurrido un error");
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { user, body } = req;

  try {
    const project = await Project.findById(id);

    if (!project) {
      const error = new Error("Projecto no encontrado");
      res.status(404).json({ message: error.message });
      return;
    }

    if (user._id.toString() !== project.creator.toString()) {
      const error = new Error("Acción no válida");
      res.status(401).json({ message: error.message });
      return;
    }

    await project.deleteOne();

    res.status(200).json({ message: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    const err = new Error("Ha ocurrido un error");
    res.status(500).json({ message: err.message });
  }
};

const addCollaborator = async (req, res) => {};
const removeCollaborator = async (req, res) => {};
const getTasks = async (req, res) => {};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  removeCollaborator,
  getTasks,
};
