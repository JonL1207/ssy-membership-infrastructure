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


// *****************************************************
//      DEPENDING ON INFO FROM MEETING 
//      THIS CAN POTENTIALLTY BE REMOVED COMPLETLEY
//      AND JUST CALL THE MEMBER GET ROUTE WHEN AN
//      ADMIN WANTS TO VIEW A USER
// *****************************************************
module.exports.single_member_GET = async (req, res) => {
    try{
        const user = await User.getSingle(req.params.id);
        res.status(200).json(user);
        // render the admin view member page with member details
    } catch(err){ 
        // handle errors function
        res.status(400).json(err.message);
    };
};


// *****************************************************
//      DEPENDING ON INFO FROM MEETING 
//      THIS CAN POTENTIALLTY BE REMOVED COMPLETLEY
//      AND JUST CALL THE REGISTER ROUTE WHEN AN 
//      ADMIN WANTS TO CREATE A NEW USER
// *****************************************************
module.exports.create_member_POST = async (req, res) => {
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


// *****************************************************
//      DEPENDING ON INFO FROM MEETING 
//      THIS CAN POTENTIALLTY BE REMOVED COMPLETLEY
//      AND JUST CALL THE MEMBER PATCH WHEN AN 
//      ADMIN WANTS TO UPDATE A  USER
// *****************************************************
module.exports.update_member_PATCH = async (req, res) => {
    const update = req.body;

    try{ 
        const response = await User.update(req.params.id, update);
        res.status(200).json(response);
        // redirect to admin home
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