const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');

router.post('/signin', signIn);

router.post('/signup', signUp);

function signUp(req, res) {
	let userData = {
		name: req.body.name,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10)
	};

	db.User
		.create(userData)
		.then((user) => {
			if (user) {
				res.json({
					status: 200,
					message: 'Registered Successfully'
				});
			} else {
				res.json({ status: 500, message: 'Registration Error' });
			}
		})
		.catch((err) => res.json({ status: 500, message: 'Registration Error' }));
}

function signIn(req, res) {
	let { email, password } = req.body;
	db.User
		.findOne({
			where: { email }
		})
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					res.json({ status: 200, message: 'Logged In' });
				} else {
					res.json({ status: 422, message: 'Invalid Password' });
				}
			} else {
				res.json({ status: 422, message: 'User not found' });
			}
		})
		.catch((err) => {
			console.log(err, 'err');
			res.json({ status: 500, message: 'Internal Server Error' });
		});
}

module.exports = router;
