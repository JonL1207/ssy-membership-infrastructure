const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

// @route   GET auth/register
// @desc    Displays the register page to the user
// @access  Public
router.get('/register', authController.register_GET);

// @route   POST auth/register
// @desc    Registers a new user in the database
// @access  Public
router.post('/register', authController.register_POST);

// @route   GET auth/login
// @desc    Displays the login page to the user
// @access  Public
router.get('/login', authController.login_GET);

// @route   POST auth/login
// @desc    Logs a user into the system
// @access  Public
router.post('/login', authController.login_POST);

// @route   GET auth/forgot-password
// @desc    Displays the forgot password page to the user
// @access  Public
router.get('/forgot-password', authController.forgot_password_GET);

// @route   POST auth/forgot-password
// @desc    Handles logic allowing user to reset their password
// @access  Public
router.post('/forgot-password', authController.forgot_password_POST);

// @route   GET auth/logout
// @desc    Logs a user out of the system
// @access  Public
router.get('/logout', authController.logout_GET);

module.exports = router;