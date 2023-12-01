import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const deserializeUser: RequestHandler = (req, res, next) => {
  try {
    console.log("req.headers.authorization", req.headers.authorization);
    console.log("----------->", req.path);

    let token = req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET!);
      if (decoded) {
        res.locals.user = decoded;
      }
      return next();
    }
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default deserializeUser;
