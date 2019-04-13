const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');

router.post('/signin', signIn);

router.post('/signup', signUp);

function signUp(req, res) {
	db.User
		.create({ ...req.query })
		.then((user) => {
			if (user) {
				res.send({
					status: 200,
					message: 'Registered Successfully'
				});
			} else {
				res.send({ status: 500, message: 'Registration Error' });
			}
		})
		.catch((err) => res.send({ status: 500, message: 'Registration Error' }));
}

function signIn(req, res) {
	let { email, password } = req.query;
	db.User
		.findOne({
			where: { email }
		})
		.then((user) => {
			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					res.send({ status: 200, message: 'User authenticated' });
				} else {
					res.send({ status: 422, message: 'Invalid Password' });
				}
			} else {
				//res.send({ status: 422, message: 'User not found' });
			}
		})
		.catch((err) => {
			console.log(err, 'err');
			res.send({ status: 500, message: err });
		});
}

module.exports = router;
