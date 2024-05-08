import jwt from "jsonwebtoken";
import F400 from "./F400.js";
import { ADMIN } from "./roles.js";

const tokenAdmin_validation = async (req, res, next) => {
  const auth = req.headers.Authorization || req.headers.authorization;

  if (auth) {
    try {
      const validation = jwt.verify(auth, process.env.SECRET_KEY);
      if (validation.role === ADMIN) {
        next();
      } else {
        res.status(400).json(F400("You are not admin to access these files"));
      }
    } catch (error) {
      res.status(400).json(F400(error.message));
    }
  } else {
    res.status(400).json(F400("Token Required"));
  }
};

export default tokenAdmin_validation;
