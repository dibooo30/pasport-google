const express = require('express');
const passportSetup = require('./passport/passport');
const index = require('./routes/index');
const login = require('./routes/login');
const profile = require('./routes/profile');
const mongoose = require('mongoose');
const keys = require('./passport/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();

mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('concting to mongodb');
});

app.set('view engine', 'ejs');

app.use(cookieSession({
	maxAge: 24*60*60*1000,
	keys:[keys.Session.cookeKey]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
app.use('/', index);
app.use('/auth', login);
app.use('/profile', profile);



app.listen(3000, function () {
	console.log('listen to port now');
});