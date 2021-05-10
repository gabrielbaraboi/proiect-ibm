import mongoose from 'mongoose'

import User from './UserModel.js';
import Post from './PostModel.js';


const ApplicationSchema = mongoose.Schema({
    offerID: { type: String, required: true },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{ timestamps: { createdAt: 'dateCreated' }});


export default mongoose.model('Application', ApplicationSchema,'Applications');
