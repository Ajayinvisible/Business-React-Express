import express from "express";
import userRouter from "./user.js"
import authRouter from "./auth.js";

let webRouter = express.Router();

webRouter.get("/",(req,res)=>{
    res.send("Hello world");
});

/*
================== Register All Routes ===================
*/

webRouter.use("/auth",authRouter)
webRouter.use("/user",userRouter);

export default webRouter;