import mongoose from "mongoose";

const TaskModel = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ["Baja", "Media", "Alta"],
  },
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
};

const taskSchema = mongoose.Schema(TaskModel, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
