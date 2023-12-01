import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);

export default userRouter;
