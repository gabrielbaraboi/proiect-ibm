import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import Application from "../models/ApplicationModel.js";
import { getFileStream, deleteFile } from "./ibmCloud.js";
import fs from 'fs';
import { unlink } from 'fs/promises';
import { uploadFile } from "./ibmCloud.js";

export const getDetails = (req, res) => {
  UserModel.findById(req.params.id, '-password').then(details => {
    if (!details) return res.status(404).json({ message: 'User not found!' });
    res.header("Content-Type", 'application/json');
    return res.status(200).json({ details })
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
      uploadFile(fileData.filename, fileStream)
        .then(async () => {
          await unlink(fileData.path).catch(err => { throw err; });
          logDone();
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
    uploadFile(fileData.filename, fileStream)
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

export const deleteUser = (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user.profilePicture)
        deleteFile(user.profilePicture)
          .catch(err => { throw err; });
      return res.status(200).json({ message: `Successfully deleted account with id : ${req.params.id}` });
    })
    .catch((err) => { return res.status(404).json({ message: err.message }) });
};

export const getProfilePicture = (req, res) => {
  if (!req.params.id) return res.status(404).json({ message: "Invalid profile id!" });
  UserModel.findById(req.params.id, '-password').then((details) => {
    if (!details) return res.status(404).json({ message: 'User not found!' });
    if (!details.profilePicture) return res.status(404).json({ message: 'No profile picture!' });
    getFileStream(details.profilePicture).on('error', err => {
      return res.status(404).json({ message: err.message });
    }).pipe(res).on('error', err => {
      return res.status(404).json({ message: err.message });
    });
  }).catch(err => { return res.status(404).json({ message: err.message }); });
};

export const getCV = (req, res) => {
  if (!req.params.id) return res.status(404).json({ message: "Invalid profile id!" });
  UserModel.findById(req.params.id, '-password').then((details) => {
    if (!details) return res.status(404).json({ message: 'User not found!' });
    if (!details.CV) return res.status(404).json({ message: 'No CV found!' });
    res.attachment('CV.pdf');
    res.set("Content-Type", "application/pdf");
    console.log('Log1');
    getFileStream(details.CV).on('error', err => {
      console.log('Log2');
      return res.status(404).json({ message: err.message });
    }).pipe(res).on('error', err => {
      console.log('Log3');
      return res.status(404).json({ message: err.message });
    });
    console.log('Log4');
  }).catch(err => {
    console.log('Log5');
    return res.status(404).json({ message: err.message });
  });
};

export const getStudentApplications = (req, res) => {
  Application.find({ applicant: req.params.id })
    .populate('offer', 'title')
    .populate('offerCreator', 'companyName')
    .exec((err, applications) => {
      if (err) {
        return res.status(404).json({ message: error.message });
      }
      res.header("Content-Type", 'application/json');
      return res.status(200).json({ applications })
    });
}

export const getCompanyApplications = (req, res) => {
  Application.find({ offerCreator: req.params.id })
    .populate('applicant', 'firstName lastName email')
    .populate('offer', 'title')
    .exec((err, applications) => {
      if (err) {
        return res.status(404).json({ message: error.message });
      }
      res.header("Content-Type", 'application/json');
      return res.status(200).json({ applications })
    });
}