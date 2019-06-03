// GENERAL
const email = 'dr.kimpatrick@gmail.com';
const password = 'Kp15712Kp';

// User signup ***************************************

// User data
exports.signup_user_1 = {
    email,
    firstName: 'Patrick',
    lastName: 'KImanje',
    password,
};

// user with missing fields
exports.signup_user_2 = {
    firstName: 'Patrick',
    lastName: 'KImanje',
    password,
};

// firstName with special characters
exports.signup_user_8 = {
    email: 'staff@g.com',
    firstName: 'Pat%%%%##',
    lastName: 'KImanje',
    password,
};

// latName with special characters
exports.signup_user_9 = {
    email: 'staff@g.com',
    firstName: 'Patrick',
    lastName: 'KImanje%%',
    password,
};
