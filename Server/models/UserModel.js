import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    email: { type: String, required: false ,unique:true},
    password: { type: String, required: true },
    profilePicture : {type: String},
    coverPicture: {type: String}
},
{
    discriminatorKey: 'role',
    collection : 'Users'
});

export default mongoose.model('User', UserSchema);