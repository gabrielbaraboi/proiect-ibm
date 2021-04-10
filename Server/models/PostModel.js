import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
    createdBy: { type: String, required: true },
    type: { type: String, required: true,enum: ['offer','request'] },
    description: { type: String, required: true },
    title: { type: String, required: true },
    programmingLanguage: { type: String, required: true },
    workHours: { type: String, required: true },
    workPlace: { type: String, required: true },
    requirements: { type: [String], required: true }
},{ timestamps: { createdAt: 'dateCreated' }});


export default mongoose.model('Post', PostSchema,'Posts');
