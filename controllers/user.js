import User from "../models/User.js";
import { generateToken, generateJWT } from "../helpers/index.js";

const signUp = async (request, response) => {
  // We get the payload email.
  const { email } = request.body;

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      const error = new Error("Email already exists");
      response.status(400).json({ errorMessage: error.message });
      return;
    }

    const user = new User(request.body);
    user.token = generateToken();
    await user.save();

    response.status(201).send(null);
  } catch (error) {
    console.log(error);
    response.status(500).json({ errorMessage: error.message });
  }
};

const authenticate = async (request, response) => {
  const { email, password } = request.body;

  // * 1-) Verify if the user exists
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("User not found");
    response.status(404).json({ errorMessage: error.message });
    return;
  }

  // * 2-) Check if the user has been confirmed.
  if (!user.confirmed) {
    const error = new Error("User not verified");
    response.status(403).json({ errorMessage: error.message });
    return;
  }

  // * 3-) Verify if the password provided matches the one stored in the DB.
  const match = await user.checkPassword(password);
  if (!match) {
    const error = new Error("Wrong password");
    response.status(403).json({ errorMessage: error.message });
    return;
  }

  // * 4-) Create the response object with the token property, which will contain the JWT generated from the user ID
  const res = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateJWT(user._id),
  };

  response.status(200).json(res);
};

const confirmUser = async (request, response) => {
  // * Retrieve the token from the params.
  const { token } = request.params;

  const user = await User.findOne({ token });

  if (!token) {
    const error = new Error("Invalid token");
    response.status(403).json({ errorMessage: error.message });
    return;
  }

  // * Change confirmed to true and remove the token.
  try {
    user.confirmed = true;
    user.token = "";
    await user.save();
  } catch (error) {
    console.log(error);
    response.status(500).json({ errorMessage: error.message });
  }

  response.status(200).json(null);
};

const forgotPassword = async (request, response) => {
  const { email } = request.body;

  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("Invalid token");
    response.status(403).json({ errorMessage: error.message });
    return;
  }

  try {
    user.token = generateToken();
    await user.save();
  } catch (error) {
    console.log(error);
    response.status(500).json({ errorMessage: error.message });
  }

  response.status(200).json({
    message: "We've sent an email with the instructions to reset the password",
  });
};

const verifyToken = async (request, response) => {
  const { token } = request.params;

  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error("Invalid token");
    response.status(403).json({ errorMessage: error.message });
    return;
  }

  response.status(200).json(null);
};

const changePassword = async (request, response) => {
  const { password } = request.body;
  const { token } = request.params;

  const user = await User.findOne({ token });

  if (!user) {
    const error = new Error("Invalid token");
    response.status(403).json({ errorMessage: error.message });
    return;
  }

  try {
    user.password = password;
    user.token = "";
    await user.save();
  } catch (error) {
    console.log(error);
    response.status(500).json({ errorMessage: error.message });
  }

  response.status(200).json({
    message: "Password modified successfully",
  });
};

const userProfile = async (request, response) => {
  const { user } = request;
  console.log(user);
};

export {
  signUp,
  authenticate,
  confirmUser,
  forgotPassword,
  verifyToken,
  changePassword,
  userProfile,
};
