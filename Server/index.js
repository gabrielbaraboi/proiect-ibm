import express from 'express';
import mongoose from 'mongoose';

const app = express();

const CONNECTION_URL="mongodb+srv://User:12345@clusterproiect.d25lj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=> app.listen(PORT,()=>console.log(`Server running on port : ${PORT}`)))
        .catch((error)=>console.log(error.message));

mongoose.set('useFindAndModify',false);