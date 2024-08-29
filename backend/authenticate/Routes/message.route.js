import express from "express";

import { sendMessage } from "../controllers/sendMessage.js";
import { getMessage } from "../controllers/getMessage.js";
const messageRoutes = express.Router();


messageRoutes.post('/send/:receiverId',sendMessage)
.get('/receive/:receiverId',getMessage);


export default messageRoutes;