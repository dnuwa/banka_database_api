import auth from '../controllers/authentication';
import Validators from '../helpers/validators';

const router = require('express').Router();

router.route('/auth/signup').post(Validators.signup, auth.signup);
router.route('/auth/login').post(Validators.login, auth.login);

export default router;
