var express = require('express');
var router = express.Router();
const authRoutes = require('./auth');
const userRoutes = require('./user');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send({ message: 'Welcome to the #OrderTogether API v1.0', status: 200 });
});

router.use('/auth', authRoutes);
router.use(userRoutes);

module.exports = router;
