const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {        
        return next();
    }
        req.flash('errors_msg', 'Not authenticated, please log in.')
        res.redirect('/users/signin');
}

module.exports = helpers;