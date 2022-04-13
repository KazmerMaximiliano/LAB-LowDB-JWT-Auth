import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(401).send({ message: "No token was provided" });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.userID = decoded.id;

  next();
};
