import mongoose from 'mongoose';
import UserModel from './UserModel.js';

const CompanySchema = mongoose.Schema({
    companyName: { type: String, required: true, unique:true},
    description: {type: String, required: false}
},
{
    discriminatorKey: 'role',
    collection : 'Users'
}
);

export default UserModel.discriminator("company",CompanySchema);