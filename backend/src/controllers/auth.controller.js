const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { verifyGoogleToken } = require('../services/google.service');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    });
};

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
    });
};

/**
 * @desc    Handle Google OAuth callback and issue JWT
 * @route   POST /auth/google
 * @access  Public
 */
const googleAuth = async (req, res) => {
    const { token } = req.body;
    try {
        const googleUser = await verifyGoogleToken(token);
        let user = await User.findOne({ googleId: googleUser.sub });

        if (!user) {
            user = await User.create({
                googleId: googleUser.sub,
                email: googleUser.email,
                name: googleUser.name,
                avatar: googleUser.picture,
            });
        }

        const accessToken = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(401).json({ error: 'Invalid Google token' });
    }
};

/**
 * @desc    Refresh JWT
 * @route   POST /auth/refresh
 * @access  Public
 */
const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ error: 'Refresh token is required' });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
        const accessToken = generateToken(user.id);
        res.json({ accessToken });
    });
};

/**
 * @desc    Logout user
 * @route   POST /auth/logout
 * @access  Private
 */
const logout = (req, res) => {
    // In a stateless JWT implementation, logout is typically handled on the client-side.
    // The client should discard the token.
    res.json({ message: 'Logout successful' });
};

/**
 * @desc    Get user profile
 * @route   GET /auth/profile
 * @access  Private
 */
const getProfile = (req, res) => {
    res.json(req.user);
};

module.exports = { googleAuth, refreshToken, logout, getProfile };
