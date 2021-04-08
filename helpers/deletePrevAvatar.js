'use strict';

const fs = require('fs');

module.exports = async function deletePrevAvatar (filename) {
    const file_path = 'images/' + filename;
    fs.unlink(file_path, (err) => {
        if (err) {
            return console.error(err)
        }
    })
}