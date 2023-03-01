const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail, isStrongPassword } = require('validator');
const formatMembershipNumber = require('../utils/formatMembershipNumber');

// Defines the structure for saving a user to the database
// @membershipNumber  -  Unique membership number for user in form <INITIALS-SSY-INCREMENTAL_5_DIGIT_NUMBER-YEAR>
// @firstName         -  The users first name
// @lastName          -  The users last name
// @email             -  The users email, validated to enure appropriate format before saving
// @password          -  The users password, validated to ensure password is strong enough. A strong password 
//                       is defined as meeting all following criteria -  minLength: 8, minLowercase: 1, 
//                       minUppercase: 1, minNumbers: 1, minSymbols: 1. Password is also encrypted before saving
// @membershipLevel   -  Level 1 = Affilate, Level 2 = <level 2>, Level 3 = <level 3>, Level 9 = Admin
//                       Each level is saved in database as a number corresponding to its level, e.g. level 1 saved as number 1
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
        required: [true, 'Please enter a valid email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, 'The email you have entered is not valid, please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Password must be a minimum length of 8 characters'],
        validate: [isStrongPassword, 'The password you have entered is not strong enough, please try again']
    },
    membershipLevel: {
        type: Number,
        required: [true, 'Must specify the mmembership level for this member'],
        default: 1
    }
}, { optimisticConcurrency: true, timestamps: true });


// Before a user document is saved to the databse give each user a membership number
// FORMAT:  INITIALS-SSY-INCREMENTAL_5_DIGIT_NUMBER-YEAR
// EXAMPLE: JLSSY1000023
userSchema.pre('save', async function(next){
    const previousMembershipNumber = await User.find({}, { membershipNumber: 1, _id: 0 }).sort({ createdAt: -1 }).limit(1);

    if(previousMembershipNumber.length === 0){
        this.membershipNumber = formatMembershipNumber(this.firstName, this.lastName, previousMembershipNumber);
        return
    };

    this.membershipNumber = formatMembershipNumber(this.firstName, this.lastName, previousMembershipNumber);
    next();
});

// Before a user is saved to the database encrypt their password
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method that can be called from an instance of the 'User' to register a new user in the database
userSchema.statics.register = async function(firstName, lastName, email, password, membershipLevel){
    const userExists = await this.findOne({ email });

    if(userExists){
        throw new Error('That email already exists');
    } else {
        const user = await this.create({ firstName, lastName, email, password, membershipLevel });
        return user;
    };
};


// Method that can be called from an instance of the 'User' to login a user to the system
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email }); 

    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        };
        throw new Error('Password incorrect');
    };
    throw new Error('The email you have entered has not been registered');
};

// Method that can be called from an instance of the 'User' to delete a user from the database
userSchema.statics.delete = async function(id){
    const user = await this.findByIdAndDelete(id); 

    if(user){
        return `${user.email} has been deleted`;
    } else {
        throw new Error('That user does not exist');
    };
};

// Method that can be called from an instance of the 'User' to update a user in the database
userSchema.statics.update = async function(id, update){
    const user = await this.findByIdAndUpdate(id, update);

    if(user){
        return `${user.email} has been updated`;
    } else {
        throw new Error('That user does not exist');
    };
};

// Method that can be called from an instance of the 'User' to retrieve a single user from the database
userSchema.statics.getSingle = async function(id){
    const user = await this.findById(id);

    if(user){
        return user;
    } else {
        throw new Error('That user does not exist');
    };
};

// Method that can be called from an instance of the 'User' to retrieve all users from the database
userSchema.statics.getAll = async function(){
    const users = await this.find({});

    if(users.length < 1){
        throw new Error('Could not find any users');
    } else {
        return users;
    };
};

module.exports = User = mongoose.model('User', userSchema);