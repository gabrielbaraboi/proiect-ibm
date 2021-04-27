import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import StudentModel from "../models/StudentModel.js";
import CompanyModel from '../models/CompanyModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import fs from 'fs';
import { uploadFile } from "./ibmCloud.js";
import { unlink } from 'fs/promises';

export const getCSRF = async (req, res) => {
    res.status(200).json({ csrfToken: req.csrfToken() });
};

export const createUser = async (req, res) => {

    const fileData = req.file;
    const data = JSON.parse(req.body.data)
    if (fileData)
        data["profilePicture"] = fileData.filename;

    const { email, role } = data;
    UserModel.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'This email is taken!' });

            let newUser = null;
            switch (role) {
                case 'student':
                    newUser = new StudentModel(data);
                    break;
                case 'company':
                    newUser = new CompanyModel(data);
                    break;
                case 'admin':
                    if (req.body?.secret === config.get('adminSecret'))
                        newUser = new UserModel(data);
                    else
                        return res.status(403).json({ message: 'Unauthorized to create admin account!' });
                    break;
                default:
                    res.status(400).json({ message: 'Invalid user role!' });
                    break;
            }
            if (!newUser.password) return res.status(400).json({ message: 'Password is required!' });
            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) throw err;

                newUser['password'] = hash;
                newUser.save().then(async (usr) => {


                    let responseUser = null;
                    if (role === 'company')
                        responseUser = {
                            id: usr._id,
                            email: usr.email,
                            companyName: usr.companyName,
                            description: usr.description
                        }
                    else if (role === 'student') {
                        responseUser = {
                            id: usr._id,
                            email: usr.email,
                            firstName: usr.firstName,
                            lastName: usr.lastName,
                            DoB: usr.DoB,
                            description: usr.description
                        }
                    }
                    else {
                        responseUser = {
                            id: usr._id,
                            email: usr.email
                        }
                    }
                    if (fileData) {
                        responseUser["profilePicture"] = fileData.filename;
                        const fileStream = fs.createReadStream(fileData.path);
                        await uploadFile(fileData.filename, fileStream)
                            .then(async () => {
                                await unlink(fileData.path).catch(err => { throw err; });
                            }).catch(async (err) => {
                                await unlink(fileData.path).catch(err => { throw err; });
                                throw err;
                            });
                    }
                    jwt.sign(
                        {
                            id: usr.id,
                            role
                        },
                        config.get('jwtSecret'),
                        { expiresIn: 5400 },
                        (err, token) => {
                            if (err) throw err;
                            res.cookie('token', token, { httpOnly: true });
                            return res.status(200).json({
                                token,
                                user: responseUser
                            });
                        }
                    );

                }).catch((err) => res.status(400).json({ message: err.message }));
            });

        }).catch(err => res.status(400).json({ message: err.message }));
}

// login
export const login = async (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'This email is not registered with an account!' });
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'The credentials are invalid!' });
                    }
                    jwt.sign(
                        {
                            id: user.id,
                            role: user.role
                        },
                        config.get('jwtSecret'),
                        { expiresIn: 5400 },
                        (err, token) => {

                            if (err) throw err;
                            const responseUser = {
                                id: user._id,
                                email: user.email,
                                role: user.role
                            };
                            if (responseUser.role === 'student') {
                                responseUser["firstName"] = user.firstName;
                                responseUser["lastName"] = user.lastName;
                            }
                            else
                                responseUser["companyName"] = user.companyName;
                            res.cookie('token', token, { httpOnly: true });
                            res.status(200).json({
                                token,
                                user: responseUser
                            });
                        }
                    );
                })

        }).catch(err => res.status(400).json({ message: err.message }));

}
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', { httpOnly: true });
        res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (err) {
        console.log(err.message);
    }
}