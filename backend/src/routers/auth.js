import express from "express";
import AuthController from "../controller/auth/AuthController.js";

let authRouter = express.Router();

let aInstance = new AuthController();

authRouter.post("/",aInstance.login);

export default authRouter;