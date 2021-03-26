'use strict';

const registrationFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Registration Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const loginFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Login Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const forgotPassFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Forgot Password Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const resetPassFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Password reset Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const newPostFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Create new post Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const newCommentFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Create new comment Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const newLikeFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Create new like or dislike Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const updatePostDataFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Update post data Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

module.exports = {
    registrationFailures,
    loginFailures,
    forgotPassFailures,
    resetPassFailures,
    newPostFailures,
    newCommentFailures,
    newLikeFailures,
    updatePostDataFailures
}
