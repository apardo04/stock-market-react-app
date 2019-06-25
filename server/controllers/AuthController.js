
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
        console.log("authcontroller userID = " + req.user.userID)
        res.status(200).json({ token: tokenForUser(req.user), userID: req.user.userID });
    }

    getStocks(req, res, next) {
        pool.query(`SELECT stock FROM stock_app.userStocks WHERE userID='${req.query.userID}';`, (err, rows, fields) => {
            if (err) throw err
            res.send(rows)
            console.log(rows)
        })
    }
}

module.exports = new AuthController();