const authMiddleware = async (request, response, next) => {
  console.log("From auth middleware");

  next();
};

export default authMiddleware;
