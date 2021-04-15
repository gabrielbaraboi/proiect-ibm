import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import StudentModel from "../models/StudentModel.js";
import CompanyModel from '../models/CompanyModel.js';


export const getDetails = async (req, res) => {
    UserModel.find( { _id : req.params.id}, (err, detalii) => {
        if(err)  res.status(404).json( {message: error.message });

        res.header("Content-Type",'application/json');
        res.status(200).json( {detalii : detalii[0]} )
    });
}