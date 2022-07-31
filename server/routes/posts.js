
import express from 'express';
import { createPosts, getPosts } from '../controller/posts.js';
import auth from '../middleware/auth.js'
import { upload } from '../middleware/uploadFile.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, upload.single('file'), createPosts);


export default router;