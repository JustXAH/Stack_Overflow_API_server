'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Igor Khanenko',
        email: 'usofXAH@gmail.com',
        rating: '666',
        role: 'admin',
        email_confirmed: true,
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        login: 'JustXAH',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Igor Khanenko',
        email: 'justxah@gmail.com',
        rating: '0',
        role: 'user',
        email_confirmed: true,
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
