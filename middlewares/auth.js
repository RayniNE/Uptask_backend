import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (request, response, next) => {
  const { headers } = request;

  if (!headers.authorization) {
    const error = new Error("Invalid token");
    return response.status(401).json({ errorMessage: error.message });
  }

  try {
    const token = headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "-password -confirmed -token -createdAt -updatedAt -__v"
    );

    request.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ errorMessage: "An error ocurred validating token" });
  }
};

export default authMiddleware;
