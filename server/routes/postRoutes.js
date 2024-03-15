const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../utils/verifyToken');

router.post('/new-story', verifyToken, postController.handleNewPost);
router.get('/getallposts', postController.handleGetPosts);

module.exports = router;