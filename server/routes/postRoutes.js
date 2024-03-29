const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../utils/verifyToken');

router.post('/new-story', verifyToken, postController.handleNewPost);
router.get('/getallposts', postController.handleGetPosts);
router.get('/getpost/:id', verifyToken, postController.handleGetSinglePost);
router.get('/numberofposts/:id', verifyToken, postController.handleGetNumberOfPosts);
router.put('/updatedblog/:id', verifyToken, postController.handleUpdatePost);

module.exports = router;