const pool = require('../db.config.js')
const passport = require('passport');
const passportJwt = require('passport-jwt');
const passportLocal = require('passport-local');
const bcrypt = require('bcrypt');

const { ExtractJwt, StrategyOprions } = passportJwt;
const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;

const localOptions = { usernameField: "email" };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    email = email.toLowerCase();
    pool.query(`SELECT * FROM stock_app.user WHERE email="${email}";`, (err, user, fields) => {
        if (user.length > 0 && user[0].password) {
            bcrypt.compare(password, user[0].password, (err, isMatch) => {
                if(err) return done(err);
                if(!isMatch) return done(null, false);
                return done(null, user);
            });
        }
        else {
            done(null, false);
        }
    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "yourJWTsecret"
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    console.log("payload.sub = " + payload.sub)
    pool.query(`SELECT * FROM stock_app.user WHERE UserID="${payload.sub}";`, (err, user, fields) => {
        if (user === null) {
            done(null, false);
        }
        done(null, user);
    });
});

const strats = {
    localLogin,
    jwtLogin
};

module.exports = strats;