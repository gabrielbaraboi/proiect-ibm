import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    email: { type: String, required: false ,unique:true},
    password: { type: String, required: true }
},
{
    discriminatorKey: 'role',
    collection : 'Users'
});

export default mongoose.model('User', UserSchema);