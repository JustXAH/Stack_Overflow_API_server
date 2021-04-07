'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        title: "JavaScript",
        description: "JavaScript (often shortened to JS) is a lightweight, " +
            "interpreted, object-oriented language with first-class functions, " +
            "and is best known as the scripting language for Web pages, but " +
            "it's used in many non-browser environments as well. It is a " +
            "prototype-based, multi-paradigm scripting language that is " +
            "dynamic, and supports object-oriented, imperative, and functional " +
            "programming styles.",
      },
      {
        title: "Node.js",
        description: "Node.js is a platform built on Chrome\'s JavaScript" +
            " runtime for easily building fast and scalable network applications.",
      },
      {
        title: "MySQL",
        description: "MySQL is a freely available open source Relational " +
            "Database Management System (RDBMS) that uses Structured Query " +
            "Language (SQL).",
      },
      {
        title: "Sequelize",
        description: "Sequelize is a promise-based Node.js ORM for Postgres, " +
            "MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid" +
            " transaction support, relations, eager and lazy loading, read " +
            "replication and more.",
      },
      {
        title: "Java",
        description: "Java is a class-based, object-oriented programming " +
            "language that is designed to have as few implementation " +
            "dependencies as possible.",
      },
      {
        title: "C",
        description: "The C programming language is a computer programming" +
            " language that was developed to do system programming for the" +
            " operating system UNIX and is an imperative programming language.",
      },
      {
        title: "C++",
        description: "C++ is a general-purpose programming language created" +
            " by Bjarne Stroustrup as an extension of the C programming" +
            " language, or 'C with Classes'.",
      },
      {
        title: "MacOs",
        description: "MacOS is the operating system that powers every Mac.",
      },
      {
        title: "IDE",
        description: "An integrated development environment (IDE) is a " +
            "software application that provides comprehensive facilities to " +
            "computer programmers for software development.",
      },
      {
        title: "WebStorm",
        description: "WebStorm is a powerful IDE for modern JavaScript " +
            "development. WebStorm provides full support for JavaScript, " +
            "TypeScript, HTML, CSS as well as for frameworks such as React, " +
            "Angular, and Vue.js right out of the box, no additional plugins " +
            "are required.",
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
