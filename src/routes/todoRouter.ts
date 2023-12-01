import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/user.controller';
import {
  addTodo,
  deleteTodo,
  getAllTodos,
} from '../controllers/todo.controller';

const todoRouter = Router();

todoRouter.get('/', getAllTodos);
todoRouter.post('/', addTodo);
todoRouter.delete('/:id', deleteTodo);

export default todoRouter;
