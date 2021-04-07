'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Admin Adminovich',
        email: 'usofXAH@gmail.com',
        rating: '999',
        role: 'admin',
        email_confirmed: true,
      },
      {
        login: 'JustXAH',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Igor Khanenko',
        email: 'justxah@gmail.com',
        rating: '4',
        role: 'user',
        email_confirmed: true,
      },
      {
        login: 'User1',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'First User',
        email: 'user2@gmail.com',
        rating: '0',
        role: 'user',
        email_confirmed: true,
      },
      {
        login: 'User2',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Second User',
        email: 'user2@gmail.com',
        rating: '0',
        role: 'user',
        email_confirmed: true,
      },
      {
        login: 'User3',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Third User',
        email: 'user3@gmail.com',
        rating: '0',
        role: 'user',
        email_confirmed: true,
      },
      {
        login: 'User4',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Fourth User',
        email: 'user4@gmail.com',
        rating: '0',
        role: 'user',
        email_confirmed: true,
      },
      {
        login: 'User5',
        password: '$2b$10$0j1veusEMYTXm6YGSbk0teLqMLvbJ6MFYc24kSWsfBEsOoGr4VpEy',
        full_name: 'Fifth User',
        email: 'user5@gmail.com',
        rating: '0',
        role: 'user',
        email_confirmed: true,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
