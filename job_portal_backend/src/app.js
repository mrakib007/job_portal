import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import userRoutes from './routes/user.routes.js';
import { swaggerDocs } from "./config/swagger.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes for auth
app.use('/api/auth', authRoutes);
//Routes for jobs
app.use('/api/jobs', jobRoutes);
//Routes for user
app.use('/api/users', userRoutes);

//swagger docs
swaggerDocs(app);

export default app;