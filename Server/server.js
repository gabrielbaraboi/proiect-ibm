import express from 'express';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/',postRoutes);

app.set("view engine", "ejs");
app.set("views", "../views");

const connectionString = 'mongodb+srv://alex:1@clusterproiect.d25lj.mongodb.net/JobPlatform?retryWrites=true&w=majority';
const PORT=process.env.PORT||9090;
mongoose.connect(connectionString,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=> app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`)))
        .catch((error)=>console.log(error.message));

