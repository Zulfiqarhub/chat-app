import express from "express";
import getAllUsers from "../controllers/fetachUsers.controller.js";

const allUserRoutes = express.Router();
allUserRoutes.get('/',getAllUsers);

export default allUserRoutes;




