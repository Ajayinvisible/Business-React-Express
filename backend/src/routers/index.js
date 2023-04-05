import express from "express";
import userRouter from "./user.js"

let webRouter = express.Router();

webRouter.get("/",(req,res)=>{
    res.send("Hello world");
});

/*
================== Register All Routes ===================
*/

webRouter.use("/user",userRouter);

export default webRouter;