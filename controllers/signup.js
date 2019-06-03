import { hashSync } from 'bcryptjs';
import middleware from '../middleware';
import db from '../db';
import bcrypt from 'bcryptjs';


class Auth {
    // create user account
     async signup(req, res){
        const {
            email, firstName, lastName, password
        } = req.body;

        // hashpassword
        const hashedPassword = hashSync(password, 8);

        // Email should be unique. 1st check if user with the above email already exists
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        if (rows.length > 0) {
            return res.status(409).send({
                status: 409,
                message: 'Email already exists, please try another',
            });
        }

        // Insert new user in the database
        const query2 = `INSERT INTO users( email, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [email, firstName, lastName, hashedPassword];

        const result = await db.query(query2, values);
        const row = result.rows[0];

        return res.status(201).send({
            status: 201,
            data: {
                token: middleware.token(row.id),
                id: row.id,
                firstName: row.firstname,
                lastName: row.lastname,
                email: row.email,
                type: row.type,
                isAdmin: row.isadmin,
                createdAt: row.createdat,
            },
        });
    };

    async login (req, res) {
        const { email, password } =req.body;
        
        const query = "SELECT * FROM users WHERE email = $1";
        
        const {rows} = await db.query(query, [email])

        if (!rows[0]){
            return res.status(400).json({
                status:400,
                error: "wrong username or password"
            })
        }

        const pass = bcrypt.compareSync(password, rows[0].password);

        if(!pass){
            return res.status(400).json({
                status:400,
                error: "wrong username or password"
            }) 
        }

        return res.status(200).json({
            status:200,
            data: {
                token: middleware.token(rows[0].id),
                email
            }
        })
    }

}
export default new Auth();
