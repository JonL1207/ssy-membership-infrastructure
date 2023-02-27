const User = require('../models/User');

module.exports.register_GET = (req, res) => {
    // render the register page
};

module.exports.register_POST = async (req, res) => {
    const { firstName, lastName, email, password, membershipLevel } = req.body;

    try{
        const user = await User.register(firstName, lastName, email, password, membershipLevel)
        res.status(201).json(user); // dont give whole user back in json when completing frontend
        // redirect user to login page
    } catch(err){
        // handle errors function
        res.status(400).json(err.message);
    }
};

module.exports.login_GET = (req, res) => {
    // render the login page 
};

module.exports.login_POST = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        req.session.isAuthenticated = true;
        req.session.user = user; // dont put whole user in session, this is for testing purposes only
        res.status(200).json(user); // dont give whole user back in json when completing frontend
        // redirect to home
    } catch(err){
        // handle errors function
        res.status(400).json(err.message);
    };
};

module.exports.forgot_password_GET = (req, res) => {
    // render the forgot password page
};

module.exports.forgot_password_POST = (req, res) => {}; // still to implement logic

module.exports.logout_POST = (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.status(200).json('user logged out');  // this should redirted to login instead
    });
};