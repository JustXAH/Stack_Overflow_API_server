'use strict';

const { passwordHashing } = require('../helpers/helpers')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'admin',
      password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
      full_name: 'Igor Khanenko',
      email: 'usofXAH@gmail.com',
      rating: '999',
      role: 'admin',
      email_confirmed: true
    }])
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};