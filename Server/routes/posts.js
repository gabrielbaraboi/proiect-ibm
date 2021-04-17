import express from 'express';
import {getPosts,postDetails,postComments,createPost,createComment,deletePost} from '../controllers/posts.js';
import { auth } from '../middleware/auth.js';
import csrfProtection from '../middleware/csrfProtection.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/postDetails/:id', postDetails);
router.get('/postComments/:id', postComments);
router.post('/createPost', auth,csrfProtection, createPost);
router.post('/:id', auth,csrfProtection, createComment)
router.delete('/:id',auth,csrfProtection,deletePost);

export default router;