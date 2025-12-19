import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'https://taskflow-kohl-three.vercel.app',
    credentials: true
}));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('TaskFlow API is running');
});

app.get('/api', (req, res) => {
  res.json({ message: 'TaskFlow API base route working' });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something broke!" });
});

export default app;