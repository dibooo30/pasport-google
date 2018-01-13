const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../module/user');

passport.serializeUser((user, done) =>{
    done(null, user.id);
});
passport.deserializeUser((id, done) => {

    User.findById(id).then((user) =>{
        done(null, user);
    });

});

passport.use(
    new GoogleStrategy({
  
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret,
    callbackURL:'/auth/google/rediect',
}, (accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    // to find user by id
    User.findOne({googleid: profile.id}).then((userIsCreated) => {

        // mack chiking befor create new data
        if(userIsCreated) {
            // console.log('this user is created befor');
            done(null, userIsCreated);
        } else{
            // schema
            new User({
                username: profile.displayName,
                googleid: profile.id,
                img:profile._json.image.url
            }).save().then((newUser) => {
                console.log('the new user created ' + newUser);
                done(null, newUser);
            });
        }
    })
})
);
