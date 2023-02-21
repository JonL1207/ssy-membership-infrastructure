const User = require('../models/User');

module.exports.register_GET = (req, res) => {};
module.exports.register_POST = async (req, res) => {
    const { firstName, lastName, email, password, } = req.body;

    try{
        const user = await User.create({ 
            firstName,
            lastName,
            email,
            password
         });
         res.status(201).json(user);
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    };
};
module.exports.login_GET = (req, res) => {};
module.exports.login_POST = (req, res) => {};
module.exports.forgot_password_GET = (req, res) => {};
module.exports.forgot_password_POST = (req, res) => {};
module.exports.logout_GET = (req, res) => {};