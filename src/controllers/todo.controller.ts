import { RequestHandler } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import todoModel from "../models/todo.model";

export const getAllTodos: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const todos = await todoModel
      .find({ userId, title: { $regex: search } })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ success: true, message: "Todo fetched", todos });
  } catch (error) {
    next(error);
  }
};

export const addTodo: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const todo = await todoModel.create({ title: req.body.title, userId });
    res.status(201).json({ success: true, message: "Todo created" });
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Todo deleted" });
  } catch (error) {
    next(error);
  }
};
