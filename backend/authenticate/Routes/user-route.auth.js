import express from 'express';
import { login, logout, signin } from '../controllers/user.auth.js';
const Routes = express.Router();


export default Routes
.post('/sigin',signin)
.post('/login',login)
.post('/logout',logout)