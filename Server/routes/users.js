import express from 'express';
import {createUser, login, logout,getCSRF} from '../controllers/users.js';
import csrfProtection from '../middleware/csrfProtection.js';

const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get('/logout',logout);
router.get('/csrfToken',csrfProtection,getCSRF);

export default router;