require('dotenv').config();

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require('cors');

const authRouter = require('./router/auth');
const usersRouter = require('./router/users');
const postsRouter = require('./router/posts');
const categoriesRouter = require('./router/categories');
const commentsRouter = require('./router/comments');

app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(__dirname + 'images'));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/comments', commentsRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}...`));