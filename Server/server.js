import express from 'express';
import {connectDB} from './config/db.js'
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
const app = express();
app.set('json spaces', 2);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/posts',postRoutes);
app.use('/users',userRoutes);

connectDB();

const PORT=process.env.PORT||9000;
app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`));
