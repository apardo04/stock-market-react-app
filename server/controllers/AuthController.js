
const pool = require('../db.config.js')
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode( { sub: user.userID, iat: timestamp }, process.env.JWT_SECRET);
}

class AuthController {
    signup(req, res, next) {
        let { password, email } =  req.body;
        email = email.toLowerCase();

        pool.query(`SELECT * FROM stock_app.user WHERE email="${email}";`, (err, rows, fields) => {
            if (err) throw err;
            if (rows.length > 0) {
                res.status(422).json({ error: true, message: "cannot create user" });
            }
            else {
                bcrypt.hash(password, bcrypt.genSaltSync(10)).then(hashedPw => {
                    pool.query(`INSERT INTO stock_app.user SET email="${email}", password="${hashedPw}", dateCreated=NOW();`, (err, rows, fields) => {
                        if (err) throw err;
                        res.status(200).json({ message: "user created"})
                    })
                })
            }
        })
    }

    signin(req, res, next) {
        res.status(200).json({ token: tokenForUser(req.user), userID: req.user.userID });
    }

    authenticate(req, res, next) {
        let authenticated = jwt.decode(req.query.token, process.env.JWT_SECRET);
        if (authenticated)
            res.status(200).send(true);
        else
            res.status(404).send(false)
    }
    getStocks(req, res, next) {
        pool.query(`SELECT stock FROM stock_app.userStocks WHERE userID='${req.query.userID}';`, (err, rows, fields) => {
            if (err) throw err
            res.status(200).send(rows)
        })
    }

    addStock(req, res, next) {
        pool.query(`INSERT INTO stock_app.userStocks SET userID='${req.query.userID}', stock='${req.query.stock}', dateAdded=NOW();`, (error, result) => {
            if (error) {
                if(error.code == 'ER_DUP_ENTRY' || error.errno == 1062) {
                    res.status(404).send("Stock is already in your portfolio")
                }
                else {
                    throw error
                }
            }
            else {
                res.status(200).send(`Stock added`);
            }
        })
    }

    deleteStock(req, res, next) {
        pool.query(`DELETE FROM stock_app.userStocks WHERE userID='${req.query.userID}' AND stock='${req.query.stock}';`, (error, result) => {
            if (error) throw error;
            res.status(200).send(`Stock deleted`);
        })
    }
}

module.exports = new AuthController();