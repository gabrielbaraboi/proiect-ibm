import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: Date, required: false },
    companyName: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

export default mongoose.model('User', UserSchema, 'Users');