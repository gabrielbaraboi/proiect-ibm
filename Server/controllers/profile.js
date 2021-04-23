import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";



export const getDetails = async (req, res) => {
    UserModel.find( { _id : req.params.id }, (err, detalii) => {
        if(err)  res.status(404).json( {message: error.message });

        res.header("Content-Type",'application/json');
        res.status(200).json( {detalii : detalii[0]} )
    });
}


export const updateProfile = async (req, res) => {
    const {firstName, lastName, companyName} = req.body;
    UserModel.findOne({_id : req.params.id}, (err, doc) => {
        if (err) {
          console.log(err);
        }
        if(firstName) doc.firstName = firstName;
        if(lastName) doc.lastName = lastName;
        if(companyName) doc.companyName = companyName;
        doc.save( (err, doc) => {
          if (err) {
            res.status(404).json( {message: error.message });
          }
          // console.log(doc);
          res.status(200).json(doc);
        });
      });
}
    