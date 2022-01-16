const userCtrl = {};
const User = require('../models/User');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');

userCtrl.renderSignUpForm = (req,res) => {
    res.render('users/signup');
};

userCtrl.signup = async (req, res) => {
    const errors = []; 
    const {name, email, password, password2} = req.body;
    if(password != password2) {
        errors.push({text: 'Password do not match.'});
    }
    if(password.length < 6) {
        errors.push({text: 'Password must be at least 6 characters.'});
    } 
    if(errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('errors_msg', 'The email is already in use. Choose another email and try again');
            res.render('users/signup', {errors});
        }else{
            const newUSer = new User({name, email, password});
            newUSer.password = await newUSer.encryptPassword(password);
            await newUSer.save();
            req.flash('success_msg', 'You are registered');
            res.redirect('/users/signin');
        }
    }
}

userCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/',    
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
}

userCtrl.updatePassword = async (req, res) => {
    const errors = []; 
    const idUser = await req.session.passport.user;        
    const {newPassword, confirmPassword} = req.body; 
        if(newPassword != confirmPassword) {
            errors.push({text: 'Password do not match.'});
        }
        if(newPassword.length < 6) {
            errors.push({text : 'Password must be at least 6 characters.'});
        } 
        if(errors.length > 0) {
            const user = await User.findById({_id : idUser});
            const email = await user.email;
            const name = await user.name;         
            res.render('index', {errors, email,name});
        }else{
            const newPass  = await encryptPassword(newPassword);
            await User.findByIdAndUpdate(idUser, {password: newPass});
            req.flash('success_msg', 'Password changed successfully. Please log in again.')
            res.redirect('/users/signin');
        }   
};

const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
};

const matchPassword = async function(password, password2) {
    return await bcrypt.compare(password, password2);
};



module.exports = userCtrl;