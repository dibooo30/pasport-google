const router = require('express').Router();

const authCheck = (req, res, next) =>{
    if(!req.user){
        res.redirect('/auth');
    } else{
        next();
    }
};  

router.get('/', authCheck, (req, res) => {
    res.render('profile', {titel:'profile-' + req.user.username, user: req.user})
});

module.exports = router;