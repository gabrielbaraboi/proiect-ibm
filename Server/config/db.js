import mongoose from 'mongoose';
import config from 'config';

const db = config.get('mongoURI');


export const connectDB = async () =>
    {
        await mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
            .then(()=> console.log("Connected to DB successfully"))
            .catch((error)=>{
                console.log(error.message);
                process.exit(1);
            });
    }