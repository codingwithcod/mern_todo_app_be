import { Router } from "express";
import userRouter from "./userRouter";
import todoRouter from "./todoRouter";
import requireUser from "../middlewares/requireUser";

const router = Router();

router.use("/user", userRouter);

router.use("/todo", requireUser, todoRouter);

export default router;
