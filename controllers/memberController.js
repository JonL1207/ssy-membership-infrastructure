const User = require('../models/User');

module.exports.member_GET = async (req, res) => {
    try{
        const user = await User.getSingle(req.params.id);
        res.status(200).json(user);
        // render the member home page with info about user from above
    } catch(err){ 
        // handle errors function
        res.status(400).json(err.message);
    };
};

module.exports.subscriptions_GET = (req, res) => {
    // call a method to get subscription info on the user model
    // need more info about membership levels before implementaion as info not yet saved to db

    // render the members subscription page with info from above
};

module.exports.update_member_GET = async (req, res) => {
    // render the update page for a member
};

module.exports.update_member_PATCH = async (req, res) => {
    const update = req.body;

    try{ 
        const response = await User.update(req.params.id, update);
        res.status(200).json(response);
        // redirect to member home
    } catch(err){ 
        // handle errors function
        res.status(400).json(err.message);
    };
};