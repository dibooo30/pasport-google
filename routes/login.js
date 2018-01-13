const router = require('express').Router();
const passport = require('passport');


router.get('/', (req, res) => {

    res.render('login', {titel: 'login', user:req.user});

});

router.get('/logout', (req, res) => {

    req.logOut();
    res.redirect('/');

});

router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));

router.get('/google/rediect', passport.authenticate('google'), (req, res) =>{

    res.redirect('/profile/');
    
});
module.exports = router;