const express = require('express');
const router = express.Router();
const { googleAuth, refreshToken, logout, getProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/google', googleAuth);
router.post('/refresh', refreshToken);
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);

module.exports = router;
