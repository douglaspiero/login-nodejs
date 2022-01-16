const { Router} = require('express');
const router = Router();
const {isAuthenticated} = require('../helpers/auth')

const {
        renderSignUpForm, 
        renderSignInForm,
        signin,
        signup,
        updatePassword,
        logout
} = require('../controllers/users.controllers');

router.get('/users/signup', renderSignUpForm );

router.post('/users/signup', signup);

router.get('/users/signin', renderSignInForm);

router.post('/users/signin', signin );

router.post('/users/updatePassword', updatePassword);

router.get('/users/logout', logout);



module.exports = router;