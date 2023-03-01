module.exports = (req, res, next) => {
    if(req.session.user.membershipLevel === 9){
        next()
    } else {
        // handle errors function
        res.status(400).json('you need to be an admin to view this'); // this is temporary
    };
};