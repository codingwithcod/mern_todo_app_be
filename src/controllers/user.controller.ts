import { RequestHandler } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const signupUser: RequestHandler = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(403)
        .json({ success: false, message: "User already registered !" });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });
    const jwtPayload = { id: newUser._id };
    const accessToken = jwt.sign(jwtPayload, JWT_SECRET!);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Wrong username or password !" });
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ success: false, message: "Wrong username or password !" });
    const jwtPayload = { id: user._id };
    const accessToken = jwt.sign(jwtPayload, JWT_SECRET!);
    res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      fullName: user.fullName,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
