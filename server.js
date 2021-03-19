require('dotenv').config();

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const authRouter = require('./router/auth');
const usersRouter = require('./router/users');

app.use(express.static(__dirname + 'images'));

app.use(urlencodedParser);
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));