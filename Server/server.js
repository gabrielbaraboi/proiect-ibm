import express from 'express';
import {connectDB} from './config/db.js'
import cors from 'cors';
import postRoutes from './routes/posts.js';
import profileRoutes from './routes/profile.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
const app = express();
app.set('json spaces', 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
  }));
app.use(cookieParser());
app.use('/posts',postRoutes);
app.use('/users',userRoutes);
app.use('/profile', profileRoutes);

connectDB();

const PORT=process.env.PORT||9000;
app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`));
