// Database connection
import db from '../db';

// Current user data
exports.currentUser = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
};

// Restrict access to only staff/admin || userData.isAdmin === false
// client can not perform debit and credit transactions
exports.isAdminUser = (userData, res) => {
    if (userData) {
        if (userData.isadmin === false) {
            return res.status(403).json({
                status: 403,
                error: 'Access denied, contact a system admin',
            });
        }
    }
};

exports.isNotClient = (userData, res) => {
    if (userData) {
        if (userData.type === 'client') {
            return res.status(403).json({
                status: 403,
                error: 'Access denied, please contact and admin or staff member',
            });
        }
    }
};

exports.isStaff = (userData, res) => {
    if (userData) {
        if (userData.type === 'client' || userData.isadmin === true) {
            return res.status(403).json({
                status: 403,
                error: 'Access denied, contact a staff member',
            });
        }
    }
};

// Transaction details
exports.transactionData = (transaction, accountObj) => (
    {
        transactionId: transaction.transactionid,
        accountNumber: accountObj.accountnumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        oldBalance: transaction.oldbalance,
        newBalance: transaction.newbalance,
        createdOn: transaction.createdon,
    }
);

// Save bank transaction
exports.saveTransaction = async (newBalance, userId, cash, type, oldBalance, accountID) => {
    // Insert new user in the database
    const query = `INSERT INTO transactions(
    transactionId,
    type,
    cashier,
    newBalance,
    oldBalance,
    amount, account_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    const values = [new Date().valueOf(), type, userId, newBalance, oldBalance, cash, accountID];
    const { rows } = await db.query(query, values);
    return rows[0];
};

// Check for the account number
exports.checkAccountNumber = async (accountNumber) => {
    const query = 'SELECT * FROM accounts WHERE accountNumber = $1';
    const { rows } = await db.query(query, [accountNumber]);
    const Obj = rows ? rows[0] : null;
    return Obj;
};

// If account with the account number does not exist
exports.ifNoAccount = (accountObj, res) => {
    if (!accountObj) {
        // Account does not exist
        return res.status(404).json({
            status: 404,
            error: 'Invalid account number, please check and try again!',
        });
    }
};

exports.checkAmount = (cash, res) => {
    // Zero and negative values not allowed
    if (cash <= 0) {
        return res.status(400).json({
            status: 400,
            error: 'Amount must greated than zero(0)',
        });
    }
};

exports.checkAmountType = (amount, res) => {
    if (isNaN(amount)) {
        return res.status(400).json({
            status: 400,
            error: 'Invalid amount format !!!',
        });
    }
};
