import mongoose, { Document } from "mongoose";

interface IBaseTodo {
  title: string;
  userId: string;
}

interface ITodoSchema extends IBaseTodo, Document {}

const todoSchema = new mongoose.Schema<ITodoSchema>({
  title: { type: String, required: true },
  userId: { type: String, required: true },
});

const todoModel = mongoose.model<ITodoSchema>("todo", todoSchema);

export default todoModel;
