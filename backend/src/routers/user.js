import express from "express";
import UserController from "../controller/UserController.js";

let userRouter = express.Router();
let userInstance = new UserController();

userRouter.get("/",userInstance.index);
userRouter.post("/",userInstance.store);

export default userRouter;