const { Router } = require('express');
const User = require('../models/User');

const router = Router();

router.post('/register', async (req, res) => {
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
        res.status(400).json('error');
    };
});

module.exports = router;