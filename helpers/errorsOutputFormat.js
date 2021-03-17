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

module.exports = {
    registrationFailures,
    loginFailures,
    forgotPassFailures,
    resetPassFailures
}
