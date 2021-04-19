import express from 'express';
import { getPosts, postDetails, postComments, createPost, createComment, deletePost, deleteComment } from '../controllers/posts.js';
import { auth } from '../middleware/auth.js';
import csrfProtection from '../middleware/csrfProtection.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/postDetails/:id', postDetails);
router.get('/postComments/:id', postComments);
router.post('/createPost', auth, csrfProtection, createPost);
router.post('/:id', auth, csrfProtection, createComment)
router.delete('/:id', auth, csrfProtection, deletePost);
router.delete('/comment/:id', auth, csrfProtection, deleteComment);

export default router;