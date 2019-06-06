const password = 'Kp15712Kp';

// User signup ***************************************

// User data
exports.signup_user_1 = {
    email: 'dnuwa@gmail.com',
    firstName: 'daniel',
    lastName: 'nuwagaba',
    password: 'somestring1',
    type: 'staff'
}

// user with missing fields
exports.signup_user_2 = {
    firstName: 'Patrick',
    lastName: 'KImanje',
    password,
};

exports.login_user_1 = {
    email: 'dnuwa@gmail.com',
    password: 'somestring1'
}
