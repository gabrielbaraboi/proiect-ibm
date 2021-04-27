import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import { getFileStream, deleteFile } from "./ibmCloud.js";


export const getDetails = async (req, res) => {
  await UserModel.findById(req.params.id, '-password').then(detalii => {
    if (!detalii) return res.status(404).json({ message: 'User not found!' });
    res.header("Content-Type", 'application/json');
    return res.status(200).json({ detalii })
  }).catch(err => {
    return res.status(404).json({ message: err.message });
  });
};


export const updateProfile = async (req, res) => {
  const { firstName, lastName, companyName, DoB, description, linkedin, github } = req.body;
  await UserModel.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) {
      console.log(err);
    }
    if (firstName) doc.firstName = firstName;
    if (lastName) doc.lastName = lastName;
    if (companyName) doc.companyName = companyName;
    if (DoB) doc.DoB = DoB;
    if (description) doc.description = description;
    if (linkedin) doc.linkedin = linkedin;
    if (github) doc.github = github;
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
  await UserModel.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user.profilePicture)
        deleteFile(user.profilePicture)
          .catch(err => { throw err; });
      return res.status(200).json({ message: `Successfully deleted account with id : ${req.params.id}` });
    })
    .catch((err) => { return res.status(404).json({ message: err.message }) });
};

export const getProfilePicture = async (req, res) => {
  await UserModel.findById(req.params.id, '-password').then(async (detalii) => {
    if (!detalii) return res.status(404).json({ message: 'User not found!' });
    if (!detalii.profilePicture) return res.status(404).json({ message: 'No profile picture!' });
    return getFileStream(detalii.profilePicture).pipe(res);
  }).catch(err => {
    return res.status(404).json({ message: err.message });
  });
};
