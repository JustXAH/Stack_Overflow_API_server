'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        author: 1,
        title: "How can I add admin to my 'Users' table in Sequelize (MySQL)" +
            " Node.js?",
        // publish_date: new Date(Date.now()),
        status: 'active',
        content: "Guys, I need to create admin in my API server. How can I" +
            " add admin with Sequelize 6?",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author: 2,
        title: "How to install Node.js on Mac?",
        // publish_date: new Date(Date.now()),
        status: 'active',
        content: "I am new to node.js. Can someone tell me the steps to" +
            " install node.js in my machine. I'm using MacOs Mojave and" +
            " WebStorm as development environment.",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author: 2,
        title: "How to install import settings in WebStorm IDE?",
        // publish_date: new Date(Date.now()),
        status: 'active',
        content: "I wanna import my settings in WebStorm in my office and" +
            " export them in my home computer. What I need to do???",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author: 1,
        title: "What's the difference between C and C++",
        // publish_date: new Date(Date.now()),
        status: 'active',
        content: "I know that C++ has the concept of objects but C doesn't. " +
            "I also know that pretty much all there is to know about C fits " +
            "into K & R but the C++ library is vastly more complex. There " +
            "have got to be other big differences though." +
            "What are the major differences between C and C++?",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author: 2,
        title: "Java - Extending Classes",
        // publish_date: new Date(Date.now()),
        status: 'active',
        content: "I have a Meeting class and I want to create a " +
            "BusinessMeeting class which extends Meeting. This is my Meeting" +
            " class: ***. Where is my mistake?",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
