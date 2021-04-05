import express from 'express';
import {getPosts,postDetails,createPost,createComment} from '../controllers/posts.js';

const router = express.Router();

router.get('/',getPosts);
router.get('/:id', postDetails);
router.post('/createPost',createPost);
router.post('/:id',createComment)

export default router;