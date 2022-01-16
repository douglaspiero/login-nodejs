const mongoose = require('mongoose');
const APP_MONGODB_HOST = process.env.APP_MONGODB_HOST;
const APP_MONGODB_DATABASE = process.env.APP_MONGODB_DATABASE;
const APP_MONGODB_PORT = process.env.APP_MONGODB_PORT;
const MONGODB_URI = `mongodb://${APP_MONGODB_HOST}:${APP_MONGODB_PORT}/${APP_MONGODB_DATABASE}`;

    
mongoose.connect(MONGODB_URI)
    .then(db => console.log("Database is Connected !"))
    .catch(err => console.log('Error connecting to database, error: ' + err))

