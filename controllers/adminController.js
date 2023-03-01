const User = require('../models/User');

module.exports.all_members_GET = async (req, res) => {
    try{
        const users = await User.getAll(req.params.id);
        res.status(200).json(users);
        // render the admin home with all member details
    } catch(err){ 
        // handle errors function
        res.status(400).json(err.message);
    };
};

module.exports.delete_member_DELETE = async (req, res) => {
    try{
        const response = await User.delete(req.params.id);
        res.status(200).json(response);
        // redirect to admin home
    } catch(err){ 
        // handle errors function
        res.status(400).json(err.message);
    };
};