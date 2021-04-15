import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
    postID: { type: String, required: true },
    createdBy: { type: String, required: true },
    comment: { type: String, required: true },
},{ timestamps: { createdAt: 'datePosted' }});


export default mongoose.model('Comment', CommentSchema,'Comments');