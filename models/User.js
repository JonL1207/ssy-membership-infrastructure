const mongoose = require('mongoose');
const { isEmail, isStrongPassword } = require('validator');
const formatMembershipNumber = require('../utils/formatMembershipNumber');

const userSchema = new mongoose.Schema({
    membershipNumber: {
        type: String,
        required: [true, 'Issue allocating membership number, please get in contact for support'],
        unique: true,
        uppercase: true,
        default: '<MEMBERSHIP_NUMBER>'
    },
    firstName: {
        type: String,
        required: [true, 'Please enter your first name'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter a vslid email'],
        lowercase: true,
        trim: true,
        validate: [isEmail, 'The email you have entered is not valid, please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Password must be a minimum length of 8 characters'],
        validate: [isStrongPassword, 'The password you have entered is not strong enough, please try again']
    }
}, { optimisticConcurrency: true, timestamps: true });


// Before a user document is saved to the databse give each user a membership number
// FORMAT:  INITIALS-SSY-INCREMENTAL_5_DIGIT_NUMBER-YEAR
// EXAMPLE: JLSSY1000023
userSchema.pre('save', async function(next){
    if(this.isNew){
        const previousMembershipNumber = await User.find({}, { membershipNumber: 1, _id: 0 }).sort({ createdAt: -1 }).limit(1);

        if(previousMembershipNumber.length === 0){
            this.membershipNumber = formatMembershipNumber(this.firstName, this.lastName, previousMembershipNumber);
            return
        };

        this.membershipNumber = formatMembershipNumber(this.firstName, this.lastName, previousMembershipNumber);
    };

    next();
});

module.exports = User = mongoose.model('User', userSchema);