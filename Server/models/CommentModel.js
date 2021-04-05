import mongoose from 'mongoose'

const CommentSchema = mongoose.Schema({
    postId: { type: String, required: true },
    createdBy: { type: Date, required: true },
    comment: { type: String, required: true },
    datePosted: { type: String, required: true },
});


export default mongoose.model('Comment', CommentSchema,'Comments');