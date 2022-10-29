import Task from "../models/Task";
import Project from "../models/Project";

const addTask = async (request, response) => {
  const { body, user } = request;

  const project = Project.findById(body?.project);

  if (!project) {
    const error = new Error("El proyecto no existe");
    response.status(404).json({ message: error.message });
    return;
  }

  if (project.creator.toString() !== user._id.toString()) {
    const error = new Error("No tienes los permisos para añadir las tareas");
    response.status(404).json({ message: error.message });
    return;
  }

  try {
    const task = new Task(body);
    await task.save();
  } catch (err) {
    console.log(err);
    const error = new Error("Ha ocurrido un error");
    response.status(500).json({ message: error.message });
  }
};

const getTask = async (request, response) => {};

const deleteTask = async (request, response) => {};

const updateTask = async (request, response) => {};

const changeState = async (request, response) => {};

export { addTask, getTask, deleteTask, updateTask, changeState };
