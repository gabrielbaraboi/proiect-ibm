import express from 'express';
import {createUser, login, logout} from '../controllers/users.js';


const router = express.Router();

router.post('/signup', createUser);
router.post('/login', login);
router.get('/logout',logout);

export default router;