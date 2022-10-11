import mongoose from "mongoose";

const ProjectModel = {
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
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: String,
    required: true,
    trim: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
};

const projectSchema = mongoose.Schema(ProjectModel, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;
