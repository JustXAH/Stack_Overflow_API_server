const { check, body } = require('express-validator');

class Validation {
   constructor(options) {
       this.registerUserDataSchema = [
           check('login')
               .isLength({ min: 4, max: 20}).withMessage('The login must be at least 4 and max 20 chars long')
               .isAlphanumeric().withMessage('Login must be alphanumeric'),
           check('password')
               .isLength({ min: 6 }).withMessage('The password must be at least 6 chars long')
               .matches(/\d/).withMessage('The password must contain a number [0-9]')
               .matches(/^(?=.*[a-z])/).withMessage('The password must contain a minimum of 1 lower case letter [a-z]')
               .matches(/^(?=.*[A-Z])/).withMessage('The password must contain a minimum of 1 lower case letter [A-Z]'),
           check('confirmPassword')
               .custom((value, { req }) => value === req.body.password)
               .withMessage('The confirmPassword must match the password field'),
           check('full_name')
               .notEmpty().withMessage('Full name is a required field'),
           check('email', 'Invalid email address')
               .isEmail().normalizeEmail()
       ]

       this.loginDataSchema = [
           check('login')
               .isLength({ min: 4, max: 20}).withMessage('The login must be at least 4 and max 20 chars long')
               .isAlphanumeric().withMessage('Login must be alphanumeric'),
           check('email', 'Invalid email address')
               .isEmail().normalizeEmail(),
               // .withMessage("Password must be greater than  and contain at least one uppercase letter, one lowercase letter, and one number")
           check('password')
               .isLength({ min: 6 }).withMessage('The password must be at least 6 chars long')
               .matches(/\d/).withMessage('The password must contain a number [0-9]')
               .matches(/^(?=.*[a-z])/).withMessage('The password must contain a minimum of 1 lower case letter [a-z]')
               .matches(/^(?=.*[A-Z])/).withMessage('The password must contain a minimum of 1 lower case letter [A-Z]'),

       ]

       this.forgotPassDataSchema = [
           check('email', 'Invalid email address')
               .isEmail().normalizeEmail(),
       ]

       this.resetPassDataSchema = [
           check('password')
               .isLength({ min: 6 }).withMessage('The password must be at least 6 chars long')
               .matches(/\d/).withMessage('The password must contain a number [0-9]')
               .matches(/^(?=.*[a-z])/).withMessage('The password must contain a minimum of 1 lower case letter [a-z]')
               .matches(/^(?=.*[A-Z])/).withMessage('The password must contain a minimum of 1 lower case letter [A-Z]'),
       ]

       this.updateUserDataSchema = [
           check('login')
               .isLength({ min: 4, max: 20}).withMessage('The login must be at least 4 and max 20 chars long')
               .isAlphanumeric().withMessage('Login must be alphanumeric'),
           check('password').if(body('password').exists())
               .isLength({ min: 6 }).withMessage('The password must be at least 6 chars long')
               .matches(/\d/).withMessage('The password must contain a number [0-9]')
               .matches(/^(?=.*[a-z])/).withMessage('The password must contain a minimum of 1 lower case letter [a-z]')
               .matches(/^(?=.*[A-Z])/).withMessage('The password must contain a minimum of 1 lower case letter [A-Z]'),
           check('confirmPassword')
               .custom((value, { req }) => value === req.body.password)
               .withMessage('The confirmPassword must match the password field'),
           check('full_name')
               .notEmpty().withMessage('Full name is a required field'),
           check('email', 'Invalid email address')
               .isEmail().normalizeEmail()
       ]

       this.createPostDataSchema = [
           check('title', "Field 'title' must exist and cannot be empty")
               .notEmpty(),
           check('content', "Field 'content' must exist and cannot be empty")
               .notEmpty(),
           check('categories', "Field 'categories' must exist and cannot be" +
               " empty")
               .notEmpty()
       ]

       this.commentDataSchema = [
           check('content', "Field 'content' must exist and cannot be empty")
               .notEmpty()
       ]

       this.likeDataSchema = [
           check('type', "The field 'type' must exist and can be only 'like'" +
               " or 'dislike'")
               .custom((value) => value === "like" || value === "dislike")
       ]

       this.updatePostDataSchema = [
           check('title', "Field 'title' cannot be empty")
               .if(body('title').exists())
               .notEmpty(),
           check('content', "Field 'content' cannot be empty")
               .if(body('content').exists())
               .notEmpty(),
           check('category', "Field 'categories' cannot be empty")
               .if(body('category').exists())
               .notEmpty()
       ]

       this.createCategorySchema = [
           check('title', "Field 'title' cannot be empty")
               .notEmpty(),
           check('description', "Field 'description' cannot be empty")
               .if(body('description').exists())
               .notEmpty(),
       ]
       this.updateCategorySchema = [
           check('title', "Field 'title' cannot be empty")
               .if(body('title').exists())
               .notEmpty(),
           check('description', "Field 'description' cannot be empty")
               .if(body('description').exists())
               .notEmpty(),
       ]
   }
}


module.exports = { Validation }