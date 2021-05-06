import express from 'express';
import { getPosts, postDetails, postComments, createPost, createComment, deletePost, deleteComment, updateComment, getWorkPlaces } from '../controllers/posts.js';
import { auth } from '../middleware/auth.js';
import csrfProtection from '../middleware/csrfProtection.js';
import { userComment } from '../middleware/userComment.js';
import { userPost } from '../middleware/userPost.js';
const router = express.Router();

router.get('/', getPosts);
router.get('/workPlaces', getWorkPlaces);
router.get('/postDetails/:id', postDetails);
router.get('/postComments/:id', postComments);
router.post('/createPost', auth, csrfProtection, createPost);
router.post('/:id', auth, csrfProtection, createComment)
router.delete('/:id', auth, csrfProtection, userPost, deletePost);
router.delete('/comment/:id', auth, csrfProtection, userComment, deleteComment);
router.put('/comment/:id', auth, csrfProtection, userComment, updateComment);

export default router;