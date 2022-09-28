import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserModel = {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token: {
    type: String,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
};

const userSchema = mongoose.Schema(UserModel, { timestamps: true });

// This is executed prior the Save() method, this middleware will handle the
// hashing of the password ONLY IF the password is being created or modified.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
