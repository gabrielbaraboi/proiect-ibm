import express from 'express';
import {connectDB} from './config/db.js'
import cors from 'cors';
import postRoutes from './routes/posts.js';
import profileRoutes from './routes/profile.js';
import userRoutes from './routes/users.js';
import cookieParser from 'cookie-parser';
import http from 'http';
import * as socketIo from 'socket.io';

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


const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on(`connection`, (socket) => {
  console.log(`New connection!`);
  socket.emit(`hello`, `ciao`);
  socket.on(`disconnect`, () => {
    console.log(`User disconnected!`);
  });
  
  socket.on(`AddComment`, (comment) => {
    console.log(comment);
    socket.broadcast.emit(`AddComment`, comment);
  });
  
  socket.on(`deleteComment`, (comment) => {
    console.log(`delete comment`);
    socket.broadcast.emit(`deleteComment`, comment._id);
  });

  socket.on(`editComment`, (comment) => {
    console.log(`edit comment`);
    socket.broadcast.emit(`editComment`, comment);
  })

});

connectDB();

const PORT=process.env.PORT||9000;
app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`));
server.listen(9001, () => console.log(`listening on port: ${9001}`));
