const bcrypt = require('bcrypt');

module.exports = {
	up: (queryInterface) => {
		return queryInterface.bulkInsert(
			'Users',
			[
				{
					name: 'Demo',
					email: 'demo@demo.com',
					password: bcrypt.hashSync('demo', 10),
					createdAt: new Date()
				},
				{
					name: 'Muhammad Adil Saeed',
					email: 'adilsaeed31@gmail.com',
					password: bcrypt.hashSync('secret', 10),
					createdAt: new Date()
				}
			],
			{}
		);
	},

	down: (queryInterface) => {
		return queryInterface.bulkDelete('Users', null, {});
	}
};
