import express from 'express';
import {createUser, login, logout,getCSRF} from '../controllers/users.js';
import csrfProtection from '../middleware/csrfProtection.js';
import multer from 'multer';
const upload = multer({dest : 'uploads/'});

const router = express.Router();

router.post('/signup',upload.single('profile-picture'), createUser);
router.post('/login', login);
router.get('/logout',logout);
router.get('/csrfToken',csrfProtection,getCSRF);

export default router;