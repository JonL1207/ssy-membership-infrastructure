module.exports = (req, res, next) => {
    if(req.session.isAuthenticated){
        next();
    } else {
        // handle error function??
        res.status(400).json('You have to log in to view this'); //this is temporary
        // redirect to login page
    };
};