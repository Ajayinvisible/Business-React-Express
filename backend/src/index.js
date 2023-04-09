import express, { json } from "express";
import http, { Server } from "http";
import cors from "cors";
import dotenv from "dotenv";
import webRouter from "./routers/index.js";
import connection from "./config/Connection.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extends:true}));
app.use(cors());


connection().then((res)=>{
    console.log(res.message);
}).catch((err)=>{
    console.log(err.message);
});

app.use("/",webRouter);


let port = process.env.PORT || 3000;

server.listen(port,()=>{
    console.log(`Server is listen on port ${port}`);
})