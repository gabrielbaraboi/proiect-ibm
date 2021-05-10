import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import { getFileStream, deleteFile } from "./ibmCloud.js";
import fs from 'fs';
import { unlink } from 'fs/promises';
import { uploadFile } from "./ibmCloud.js";

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
  const fileData = req.file;
  let data = {};
  if (req.body.data)
    data = JSON.parse(req.body.data);
  if (fileData)
    data["profilePicture"] = fileData.filename;
  const { firstName, lastName, companyName, DoB, description, linkedin, github, facebook, twitter } = data;
  await UserModel.findOne({ _id: req.params.id }, async (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: err.message });
    }
    if (firstName) doc.firstName = firstName;
    if (lastName) doc.lastName = lastName;
    if (companyName) doc.companyName = companyName;
    if (DoB) doc.DoB = DoB;
    if (description) doc.description = description;
    if (linkedin) doc.linkedin = linkedin;
    if (github) doc.github = github;
    if (facebook) doc.facebook = facebook;
    if (twitter) doc.twitter = twitter;
    if (data.profilePicture) {
      const fileStream = fs.createReadStream(fileData.path);
      if (doc.profilePicture)
        deleteFile(doc.profilePicture).catch(err => { return res.status(404).json({ message: err.message }) });
      await uploadFile(fileData.filename, fileStream)
        .then(async () => {
          await unlink(fileData.path).catch(err => { throw err; });
        }).catch(async (err) => {
          await unlink(fileData.path).catch(err => { throw err; });
          return res.status(404).json({ message: err.message });
        });
      doc.profilePicture = data.profilePicture;
    }
    doc.save((err, doc) => {
      if (err) {
        return res.status(404).json({ message: error.message });
      }
      // console.log(doc);
      return res.status(200).json(doc);
    });
  });
};
export const updateCV = async (req, res) => {
  const fileData = req?.file;
  if (!fileData)
    return res.status(404).json({ message: 'No CV uploaded!' });
  if (req?.user?.role !== 'student')
    return res.status(400).json({ message: 'Only Students can have CVs!' });
  await UserModel.findOne({ _id: req.params.id }, async (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: err.message });
    }
    const fileStream = fs.createReadStream(fileData.path);
    if (doc.CV)
      deleteFile(doc.CV).catch(err => { return res.status(404).json({ message: err.message }) });
    await uploadFile(fileData.filename, fileStream)
      .then(async () => {
        await unlink(fileData.path).catch(err => { throw err; });
      }).catch(async (err) => {
        await unlink(fileData.path).catch(err => { throw err; });
        return res.status(404).json({ message: err.message });
      });
    doc.CV = fileData.filename;
    doc.save((err, doc) => {
      if (err) {
        return res.status(404).json({ message: error.message });
      }
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
  if (!req.params.id) return res.status(404).json({ message: "Invalid profile id!" });
  await UserModel.findById(req.params.id, '-password').then(async (detalii) => {
    if (!detalii) return res.status(404).json({ message: 'User not found!' });
    if (!detalii.profilePicture) return res.status(404).json({ message: 'No profile picture!' });
    getFileStream(detalii.profilePicture)
      .on('error', (err) => {
        console.log("we've got another error");
        return res.status(404).json({message:err.message});
      })
      .pipe(res);
  }).catch(err => { return res.status(404).json({ message: err.message }); });
};

export const getCV = async (req, res) => {
  if (!req.params.id) return res.status(404).json({ message: "Invalid profile id!" });
  await UserModel.findById(req.params.id, '-password').then(async (detalii) => {
    if (!detalii) return res.status(404).json({ message: 'User not found!' });
    if (!detalii.CV) return res.status(404).json({ message: 'No CV found!' });
    res.attachment('CV.pdf');
    res.set("Content-Type", "application/pdf");
    getFileStream(detalii.CV)
      .on('error', (err) => {
        throw err;
        // return res.status(404).json({ message: err.message });
      })
      .pipe(res);
  }).catch(err => { return res.status(404).json({ message: err.message }); });
};
