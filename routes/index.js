import signup from '../controllers/signup';
import Validators from '../helpers/validators';

const router = require('express').Router();

router.route('/auth/signup').post(Validators.signup, signup.signup);
router.route('/auth/login').post(signup.login);

export default router;
