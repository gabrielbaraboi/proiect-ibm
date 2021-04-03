import express from 'express';
import {getPosts} from '../controllers/posts.js';
import {postDetails} from '../controllers/posts.js'

const router = express.Router();

router.get('/',getPosts);
router.get('/detaliiPost', postDetails);

export default router;