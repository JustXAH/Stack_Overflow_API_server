'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        author_id: 2,
        post_id: 1,
        content: "You can use sequelize cli migration and create seeds with" +
            " admins.",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 1,
        post_id: 1,
        content: "Thanks! It works!",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 2,
        post_id: 2,
        content: "Just install node from this site: https://nodejs.org/uk/ ." +
            " Or you can install brew and install node by brew: https://brew.sh/index_ru",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 1,
        post_id: 2,
        content: "Thanks, man!",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 1,
        post_id: 3,
        content: "You can look it here: https://www.jetbrains.com/help/webstorm/sharing-your-ide-settings.html",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 2,
        post_id: 3,
        content: "I was try this. Already doesn't work:(",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 1,
        post_id: 3,
        content: "This is strange. Then try like this https://stackoverflow.com/questions/34213450/import-settings-in-intellij-idea-phpstorm-or-webstorm",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
      {
        author_id: 1,
        post_id: 4,
        content: "C++ is a direct descendant of C that retains almost all of C" +
            " as a subset. C++ provides stronger type checking than C and " +
            "directly supports a wider range of programming styles than C. " +
            "C++ is \"a better C\" in the sense that it supports the styles " +
            "of programming done using C with better type checking and more " +
            "notational support (without loss of efficiency). In the same " +
            "sense, ANSI C is a better C than K&R C. In addition, C++ supports" +
            " data abstraction, object-oriented programming, and generic " +
            "programming (see The C++ Programming Language (3rd Edition)\"; " +
            "Appendix B discussing compatibility issues is available for " +
            "downloading).",
        // createdAt: new Date(Date.now()),
        // updatedAt: new Date(Date.now())
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
