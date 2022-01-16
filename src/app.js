const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const {engine} = require('express-handlebars');
const { use } = require('./routes/users.routes');
const {isAuthenticated} = require('./helpers/auth');
const User = require('./models/User');
const port = process.env.PORT;
const host = process.env.HOST;

//Initializations
require('./config/passport');
require('./database');


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/users.routes'));

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialssDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs')

app.get('/', isAuthenticated, async (req,res) => {
    const idUser = req.session.passport.user;
    const user = await User.findById({_id : idUser});
    const email = await user.email;
    const name = await user.name;
    res.render('index', {email, name});
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.render('404');
});

app.listen(port, (err) => {
    if(!err){
     console.log(`Server running on: http://${host}/` + port);   
    }else {
     console.log("Server did not start, error: " + err);   
    }    
});


