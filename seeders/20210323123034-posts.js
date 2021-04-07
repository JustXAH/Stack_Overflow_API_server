'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        author_id: 1,
        title: "How can I add admin to my 'Users' table in Sequelize (MySQL)" +
            " Node.js?",
        status: 'active',
        content: "Guys, I need to create admin in my API server. How can I" +
            " add admin with Sequelize 6?",
      },
      {
        author_id: 2,
        title: "How to install Node.js on Mac?",
        status: 'active',
        content: "I am new to node.js. Can someone tell me the steps to" +
            " install node.js in my machine. I'm using MacOs Mojave and" +
            " WebStorm as development environment.",
      },
      {
        author_id: 2,
        title: "How to install import settings in WebStorm IDE?",
        status: 'active',
        content: "I wanna import my settings in WebStorm in my office and" +
            " export them in my home computer. What I need to do???",
      },
      {
        author_id: 1,
        title: "What's the difference between C and C++",
        status: 'active',
        content: "I know that C++ has the concept of objects but C doesn't. " +
            "I also know that pretty much all there is to know about C fits " +
            "into K & R but the C++ library is vastly more complex. There " +
            "have got to be other big differences though." +
            "What are the major differences between C and C++?",
      },
      {
        author_id: 2,
        title: "Java - Extending Classes",
        status: 'active',
        content: "I have a Meeting class and I want to create a " +
            "BusinessMeeting class which extends Meeting. This is my Meeting" +
            " class: ***. Where is my mistake?",
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
