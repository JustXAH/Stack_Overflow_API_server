'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      login: 'admin',
      password: '$2b$10$hMvHPM3hq8qn5KKW6q48b.QEgabLU8XZkzed1VlPXglzb.TqU2Y3i',
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