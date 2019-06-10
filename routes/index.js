import auth from '../controllers/authentication';
import account from '../controllers/createAccount';
import accTransactions from '../controllers/creditDebit';
import userType from '../controllers/userType';
import middleware from '../middleware';
import Validators from '../helpers/validators';
import validators from '../helpers/validators';

const { verifyToken } = middleware

const router = require('express').Router();

router.route('/auth/signup').post(Validators.signup, auth.signup);
router.route('/auth/login').post(Validators.login, auth.login);
router.route('/account').post(verifyToken, Validators.account, account.createaccount);
router.route('/account/:accountNumber/credit').post(verifyToken, Validators.credit, accTransactions.creditTransaction);
router.route('/account/:accountNumber/debit').post(verifyToken, validators.credit, accTransactions.debitTransaction)
router.route('/user/type').put(verifyToken, userType);

export default router;
