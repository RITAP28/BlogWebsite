const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const limiter = require('../utils/rateLimiter');
const verifyToken = require('../utils/verifyToken');

router.post('/register', userController.handleNewUser);
router.post('/login', limiter, userController.handleLogin);
router.post('/logout', userController.handleLogout);
router.post('/google', userController.handleGoogleAuth);
router.get("/me", verifyToken, userController.handleGetUser);

module.exports = router;