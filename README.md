# usof--Stack_Overflow_clone
Stack Overflow clone -  is challenge to create an API for a future question and answer service for professional and enthusiast programmer.

#installation:
```md
> npm install
> mysql -u root
> CREATE USER ikhanenko@localhost IDENTIFIED BY 'Super_securepass_123';
> GRANT ALL PRIVILEGES ON * . * TO ikhanenko@localhost;
> Make <b>.env</b> file with next parameters:
    SALT_ROUNDS=<b>Default value '10'</b>
    JWT_SECRET_KEY=<b>Your secret key</b>
    JWT_EXPIRES_IN=<b>Token expires time</b>
    USOF_EMAIL_HOST=<b>Your email host</b>
    USOF_EMAIL_PORT=<b>Your email port</b>
    USOF_EMAIL=<b>Your email address</b>
    USOF_EMAIL_PASSWORD=<b>Your email password for app</b>

```
#usage:
```md
> nodemon server.js
```

#dependencies:<br/>
```md
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "config": "^3.3.6",
    "dotenv": "^8.2.0",
    "email-validator": "^2.0.4",
    "express": "^4.17.1",
    "express-paginate": "^1.0.2",
    "express-validator": "^6.10.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "nodemailer": "^6.5.0",
    "sequelize": "^6.5.0"
    "sequelize-cli": "^6.2.0"
    "nodemon": "^2.0.7",
    node v13 and higher<br/>
    npm v13 and higher<br/>
```
##licenses:<br/>
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

##Author:<br/>
**Igor Khanenko**