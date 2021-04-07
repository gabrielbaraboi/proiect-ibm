import mongoose from 'mongoose';
import UserModel from './UserModel.js';


const StudentSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    DoB : {type: Date,required:true},
    description : {type: String, required: false}
},
{
    discriminatorKey: 'role',
    collection : 'Users'
});

export default UserModel.discriminator("student",StudentSchema);