'use strict';

const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        req.errorCode = 400;
        cb(null, false);
    }
};

const imageUploadHandler = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

module.exports = imageUploadHandler.single('avatar');