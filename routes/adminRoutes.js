const { Router } = require('express');
const adminController = require('../controllers/adminController');
const memberController = require('../controllers/memberController');
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/isAuthenticated');
const isAdmin = require('../middleware/isAdmin')

const router = Router();

// Use middleware before every request to a member resourse
router.use(isAuthenticated);

// @route   GET admin/all-members
// @desc    Displays all members of the system to only the admin
// @access  Admin-Authenticated
router.get('/all-members', isAdmin, adminController.all_members_GET);

// @route   GET admin/single-member/:id
// @desc    Displays a single member od the system to only the admin
// @access  Admin-Authenticated
router.get('/single-member/:id', memberController.member_GET);

// @route   GET admin/create-member
// @desc    Displays create member page for admin
// @access  Admin-Authenticated
router.post('/create-member');

// @route   POST admin/create-member
// @desc    Allows an admin to create a new member for the system
// @access  Admin-Authenticated
router.post('/create-member', authController.register_POST);

// @route   GET admin/update-member/:id
// @desc    Displays the update member page for the admin
// @access  Admin-Authenticated
router.patch('/update-member/:id');

// @route   PATCH admin/update-member/:id
// @desc    Allows an admin to update the details for a single member of the system
// @access  Admin-Authenticated
router.patch('/update-member/:id', memberController.update_member_PATCH);

// @route   DELETE admin/delete-member/:id
// @desc    Allows an admin to delete a members details from the system
// @access  Admin-Authenticated
router.delete('/delete-member/:id', adminController.delete_member_DELETE);

module.exports = router;