import express from "express";
import dotenv from "dotenv";
import  suthRoutes from "./authenticate/Routes/user-route.auth.js";
import messageRoutes from "./authenticate/Routes/message.route.js"; 
import { dbConnection } from "./db/dbconnection.js";
import cookieParser  from "cookie-parser";
import { authenticateUser } from "./middleware/authenticateUser.js";
import allUserRoutes from "./authenticate/Routes/fetchuser.route.js";

dotenv.config();
const server = express();

// body parser
server.use(express.json());
server.use(cookieParser());
// variable
const Port = process.env.PORT || 5000;

server.use('/auth',suthRoutes);
server.use('/message',authenticateUser,messageRoutes);
server.use('/users',authenticateUser,allUserRoutes);


server.listen(Port,()=>{
  dbConnection();
  console.log(`Hi the server is started listning on port ${Port}`);
})