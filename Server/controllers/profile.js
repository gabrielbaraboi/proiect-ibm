import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";



export const getDetails = async (req, res) => {
  UserModel.findById(req.params.id).then(detalii => {
    if (!detalii) return res.status(404).json({ message: 'User not found!' });
    res.header("Content-Type", 'application/json');
    return res.status(200).json({ detalii })
  }).catch(err => {
    return res.status(404).json({ message: err.message });
  });
};


export const updateProfile = async (req, res) => {
  const { firstName, lastName, companyName } = req.body;
  UserModel.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    if (firstName) doc.firstName = firstName;
    if (lastName) doc.lastName = lastName;
    if (companyName) doc.companyName = companyName;
    doc.save((err, doc) => {
      if (err) {
        return res.status(404).json({ message: error.message });
      }
      // console.log(doc);
      return res.status(200).json(doc);
    });
  });
};

export const deleteUser = async (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.status(200).json({ message: `Successfully deleted account with id : ${req.params.id}` });
    })
    .catch((err) => { return res.status(404).json({ message: err.message }) });
};
