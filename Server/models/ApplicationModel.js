import mongoose from 'mongoose'

const ApplicationSchema = mongoose.Schema({
    offer:  { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    offerCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},{ timestamps: { createdAt: 'dateCreated' }});


export default mongoose.model('Application', ApplicationSchema,'Applications');
