const router = require('express').Router();


router.get('/', function(req, res) {
	res.render('index', {titel: 'index', user:req.user});
});

module.exports = router;