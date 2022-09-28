import User from "../models/User.js";

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
    await user.save();

    response.status(201).send(null);
  } catch (error) {
    console.log(error);
    response.status(500).json({ errorMessage: error.message });
  }
};

export { signUp };
