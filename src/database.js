const mongoose = require('mongoose');
const APP_MONGODB_URL = process.env.APP_MONGODB_URL;

    
mongoose.connect(APP_MONGODB_URL)
    .then(db => console.log("Database is Connected !"))
    .catch(err => console.log('Error connecting to database, error: ' + err))

