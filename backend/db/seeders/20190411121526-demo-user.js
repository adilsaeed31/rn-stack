'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        name: 'Demo',
        email: 'demo@demo.com',
        password: 'demo',
        createdAt: Sequelize.NOW()
      },
      {
        name: 'Muhammad Adil Saeed',
        email: 'adilsaeed31@gmail.com',
        password: 'secret',
        createdAt: Sequelize.NOW()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};