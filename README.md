# usof--Stack_Overflow_clone
Stack Overflow clone -  is challenge to create an API for a future question and answer service for professional and enthusiast programmer.

# Endpoints:
**Authentication module**:
- [x] POST - /api/auth/register - registration of a new user, required parameters are [login, password, password confirmation, email]
- [x] GET  - /api/register/email-confirm/<confirm_token> - confirm user email
- [x] POST - /api/auth/login - log in user, required parameters are [login, email,password]. Only users with a confirmed email can sign in
- [x] POST - /api/auth/logout - log out authorized user
- [x] POST - /api/auth/password-reset - send a reset link to user email, requiredparameter is [email]
- [x] GET - /api/auth/password-reset/<reset_token> - reset password form
- [x] POST - /api/auth/password-reset/<reset_token> - confirm new password with a token from email, required parameter is a [new password]

**User module**:
- [x] GET - /api/users - get all users
- [x] GET - /api/users/<user_id> - get specified user data
- [x] POST - /api/users - create a new user, required parameters are [login, password, password confirmation, email, role]. This feature must be accessible only for admins
- [x] POST - /api/users/avatar - let an authorized user upload his/her avatar. Theuser will be designated by his/her access token# usof--Stack_Overflow_clone
- [x] PATCH - /api/users/<user_id> - update user data
- [x] DELETE - /api/users/<user_id> - delete user

**Post module**:
- [x] GET - /api/posts- get all posts.This endpoint doesn't require any role, it is public. If there are too many posts, you must implement pagination. Page size is up to you
- [x] GET - /api/posts- get all favorite user posts. 
- [x] GET - /api/posts/<post_id> - get specified post data.Endpoint is public
- [x] GET - /api/posts/<post_id>/comments - get all comments for the specified post.Endpoint is public
- [x] GET - /api/posts/<post_id>/categories - get all categories associated with thespecified post
- [x] GET - /api/posts/<post_id>/like - get all likes under the specified post
- [x] POST - /api/posts/ - create a new post, required parameters are [title, content,categories]
- [x] POST - /api/posts/favorite - add post to favorites
- [x] POST - /api/posts/<post_id>/comments - create a new comment, required parameteris [content]
- [x] POST - /api/posts/<post_id>/like - create a new like under a post
- [x] PATCH - /api/posts/<post_id> - update the specified post (its title, body orcategory). It's accessible only for the creator of the post
- [x] DELETE - /api/posts/<post_id> - delete a post
- [x] DELETE - /api/posts/<post_id>/favorite - delete a post from favorites
- [x] DELETE - /api/posts/<post_id>/like - delete a like under a post

**Categories module**:
- [x] GET - /api/categories- get all categories
- [x] GET - /api/categories/<category_id> - get specified category data
- [x] GET - /api/categories/<category_id>/posts - get all posts associated with the specified category
- [x] POST - /api/categories - create a new category, required parameter is [title]. This feature available only for admins
- [x] PATCH - /api/categories/<category_id> - update specified category data
- [x] DELETE - /api/categories/<category_id> - delete a category

**Comments module**:
- [x] GET - /api/comments/<comment_id> - get specified comment data
- [x] GET - /api/comments/<comment_id>/like - get all likes under the specified comment
- [x] POST - /api/comments/<comment_id>/like - create a new like under a comment
- [x] PATCH - /api/comments/<comment_id> - update specified comment data
- [x] DELETE - /api/comments/<comment_id> - delete a comment
- [x] DELETE - /api/comments/<comment_id>/like - delete a like under a comment

#preparation:
```md
> Make .env file with next parameters:
    SALT_ROUNDS= (Default value '10')
    JWT_SECRET_KEY= (Your secret key)
    JWT_EXPIRES_IN= (Token expires time)
    USOF_EMAIL_HOST= (Your email host)
    USOF_EMAIL_PORT= (Your email port)
    USOF_EMAIL= (Your email address)
    USOF_EMAIL_PASSWORD= (Your email password for app)
```

#installation:
```md
> npm install
> mysql -u root
> CREATE USER ikhanenko@localhost IDENTIFIED BY 'Super_securepass_123';
> GRANT ALL PRIVILEGES ON * . * TO ikhanenko@localhost;
```

#usage:
```md
> npx sequelize-cli db:migrate
> npx sequelize-cli db:seed:all
> nodemon server.js
```

#dependencies:
```md
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "config": "^3.3.6",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "email-validator": "^2.0.4",
    "express": "^4.17.1",
    "express-paginate": "^1.0.2",
    "express-validator": "^6.10.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.2",
    "mysql2": "^2.2.5",
    "nodemailer": "^6.5.0",
    "nodemon": "^2.0.7",
    "sequelize": "^6.5.0"
    "sequelize-cli": "^6.2.0"
    node v15.11.0 and higher
    npm v7.8.0 and higher
```
##licenses:
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

##Author:
**Igor Khanenko**