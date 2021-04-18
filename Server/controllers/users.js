import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import StudentModel from "../models/StudentModel.js";
import CompanyModel from '../models/CompanyModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';

export const getCSRF = async (req, res) => {
    res.status(200).json({ csrfToken: req.csrfToken() });
};

export const createUser = async (req, res) => {
    const { email, role } = req.body;

    UserModel.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ message: 'This email is taken!' });

            let newUser = null;
            switch (role) {
                case 'student':
                    newUser = new StudentModel(req.body);
                    break;
                case 'company':
                    newUser = new CompanyModel(req.body);
                    break;
                case 'admin':
                    if(req.body?.secret===config.get('adminSecret'))
                        newUser = new UserModel(req.body);
                    else
                        return res.status(403).json({message : 'Unauthorized to create admin account!'});
                    break;        
                default:
                    res.status(400).json({ message: 'Invalid user role!' });
                    break;
            }
            if (!newUser.password) return res.status(400).json({ message: 'Password is required!' });
            bcrypt.hash(newUser.password, 10, (err, hash) => {
                if (err) throw err;

                newUser['password'] = hash;
                newUser.save().then(usr => {


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
                    else{
                        responseUser = {
                            id:usr._id,
                            email:usr.email
                        }
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
                                res.status(200).json({
                                    token,
                                    user: responseUser
                                });
                            }
                        );

            }).catch((err) => res.status(400).json({ message: err.message }));
        });

}).catch (err => res.status(400).json({ message: err.message }));

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
                        return res.status(400).json({ msg: 'The credentials are invalid!' });
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
                            const responseUser={
                                _id:user._id,
                                email:user.email,
                                role:user.role
                            };
                            res.cookie('token', token, { httpOnly: true });
                            res.status(200).json({
                                token,
                                user:responseUser
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