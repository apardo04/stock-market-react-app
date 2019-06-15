const pool = require('./data/config.js')
const express = require('express')
const server = express.Router()

server.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.sendStatus(401);
}

server.get('/api/stocks', ensureAuthenticated, (req, res) => {
    pool.query(`SELECT stock FROM stock_app.userStocks WHERE userID='${req.query.userID}';`, (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
})

server.post('/api/stocks', ensureAuthenticated, (req, res) => {
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
            res.status(201).send(`Stock added`);
        }
    })
})

server.delete('/api/stocks', ensureAuthenticated, (req, res) => {
    pool.query(`DELETE FROM stock_app.userStocks WHERE userID='${req.query.userID}' AND stock='${req.query.stock}';`, (error, result) => {
        if (error) throw error;
        res.status(200).send(`Stock deleted`);
    })
})

module.exports = server;
  