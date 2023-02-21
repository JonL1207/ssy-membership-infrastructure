const { Router } = require('express');
const adminController = require('../controllers/adminController');

const router = Router();

// @route   GET admin/all-members
// @desc    Displays all members of the system to only the admin
// @access  Admin-Authenticated
router.get('/all-members', adminController.all_members_GET);

// @route   GET admin/single-member/:id
// @desc    Displays a single member od the system to only the admin
// @access  Admin-Authenticated
router.get('/single-member/:id', adminController.single_member_GET);

// @route   POST admin/create-member
// @desc    Allows an admin to create a new member for the system
// @access  Admin-Authenticated
router.post('/create-member', adminController.create_member_POST);

// @route   PATCH admin/update-member/:id
// @desc    Allows an admin to update the details for a single member of the system
// @access  Admin-Authenticated
router.patch('/update-member/:id', adminController.update_member_PATCH);

// @route   DELETE admin/delete-member/:id
// @desc    Allows an admin to delete a members details from the system
// @access  Admin-Authenticated
router.delete('/delete-member/:id', adminController.delete_member_DELETE);

module.exports = router;