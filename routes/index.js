import auth from '../controllers/authentication';
import account from '../controllers/createAccount';
import middleware from '../middleware';
import Validators from '../helpers/validators';

const { verifyToken } = middleware

const router = require('express').Router();

router.route('/auth/signup').post(Validators.signup, auth.signup);
router.route('/auth/login').post(Validators.login, auth.login);
router.route('/account').post(verifyToken, Validators.account, account.createaccount);

export default router;
