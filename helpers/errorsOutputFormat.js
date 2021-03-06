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

const removeLikeFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Remove like or dislike Failure",
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

const newCategoryFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Create new category Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const updateCategoryFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Update category Failure",
        location: location,
        param: param,
        message: msg,
        value: value,
    }
};

const updateCommentFailures = ({location, msg, param, value}) => {
    return {
        type: "Error",
        status: "400 Bad Request",
        name: "Update comment Failure",
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
    removeLikeFailures,
    updatePostDataFailures,
    newCategoryFailures,
    updateCategoryFailures,
    updateCommentFailures
}
