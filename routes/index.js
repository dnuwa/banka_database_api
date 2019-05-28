import signup from '../controllers/signup';

const router = require('express').Router();

router.route('/auth/signup').post(signup.signup);

export default router;
