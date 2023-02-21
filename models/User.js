const mongoose = require('mongoose');
const { isEmail } = require('validator');
const formatMembershipNumber = require('../utils/formatMembershipNumber');

const userSchema = new mongoose.Schema({
    membershipNumber: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        default: '<MEMBERSHIP_NUMBER>'
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: isEmail
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, { optimisticConcurrency: true, timestamps: true });


// Before a user document is saved to the databse give each user a membership number
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