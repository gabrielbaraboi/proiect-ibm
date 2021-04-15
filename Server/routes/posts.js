import express from 'express';
import {getPosts,postDetails,postComments,createPost,createComment} from '../controllers/posts.js';
import { auth } from "../middleware/auth.js"
const router = express.Router();

router.get('/', getPosts);
router.get('/postDetails/:id', postDetails);
router.get('/postComments/:id', postComments);
router.post('/createPost', auth, createPost);
router.post('/:id', auth, createComment)

export default router;