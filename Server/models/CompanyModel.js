import mongoose from 'mongoose';
import UserModel from './UserModel.js';

const CompanySchema = mongoose.Schema({
    companyName: { type: String, required: true },
    description: {type: String, required: false}
},
{discriminatorKey: 'role'}
);

export default UserModel.discriminator("company",CompanySchema,"","Users");