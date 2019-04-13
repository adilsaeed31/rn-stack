const express = require('express');
const router = express.Router();
const db = require('../../db');

router.get('/users', getUsers);

function getUsers(req, res) {
	db.User.findAll().then((users) => {
		if (users.length > 0) {
			res.send({
				status: 200,
				message: 'Records found',
				data: users
			});
		} else {
			res.send({
				status: 400,
				message: 'Nothing found',
				data: []
			});
		}
	});
}

module.exports = router;
