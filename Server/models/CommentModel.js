import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
    postID: { type: String, required: true },
    createdBy: { type: String, required: true },
    comment: { type: String, required: true },
    datePosted: { type: Date, required: true, default: new Date() }
});


export default mongoose.model('Comment', CommentSchema,'Comments');