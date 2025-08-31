import express from 'express';
import cors from 'cors';
const app = express();
import authRouter from "./Routes/auth.Route.js";
import ProjectRouter from "./Routes/project.Route.js";
import teamRouter from './Routes/team.Route.js';
import SubtaskRouter from './Routes/subtask.Route.js';
import userRouter from './Routes/user.Route.js'
import { authenticate } from './Middlewares/authMiddleware.js';
app.use(cors({
  origin: '*',
  credentials : true
}))

app.use(express.json({
  limit: '16kb'
}))

app.use(express.urlencoded({ extended: true, limit: "16kb" }))

app.use(express.static("public"));
app.use('/api/auth', authRouter);
app.use('/api/projects', ProjectRouter);
app.use('/api/projects/',authenticate, SubtaskRouter);
app.use('/api/teams', authenticate, teamRouter);
app.use('/api/users', userRouter);
export {app}