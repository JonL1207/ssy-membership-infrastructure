const { Router } = require('express');
const memberController = require('../controllers/memberController');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = Router();

// Use middleware before every request to a member resourse
router.use(isAuthenticated);

// @route   GET member/:id
// @desc    Displays the data for a member of the system
// @access  Authenticated
router.get('/:id', memberController.member_GET);

// @route   GET member/subscriptions
// @desc    Displays the subscription details for a member
// @access  Authenticated
router.get('/subscriptions', memberController.subscriptions_GET);

// @route   GET member/:id
// @desc    Displays the update details page for a member
// @access  Authenticated
router.get('/:id', memberController.update_member_GET);

// @route   PATCH member/:id
// @desc    Allows a member to update their details
// @access  Authenticated
router.patch('/:id', memberController.update_member_PATCH);

module.exports = router;