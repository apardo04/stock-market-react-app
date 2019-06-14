const pool = require('./data/config.js')
const express = require('express')
const server = express.Router()

server.get('/api/users', (req, res) => {
    pool.query("SELECT username, email FROM stock_app.user;", (err, rows, fields) => {
        if (err) throw err
        res.send(rows[0])
    })
})

server.get('/api/stocks', (req, res) => {
    pool.query(`SELECT stock FROM stock_app.userStocks WHERE userID='${req.query.userID}';`, (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
})

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
}

server.post('/api/stocks', ensureAuthenticated, (req, res) => {
    pool.query(`INSERT INTO stock_app.userStocks SET userID='${req.query.userID}', stock='${req.query.stock}', dateAdded=NOW();`, (error, result) => {
        if (error) throw error;
        res.status(201).send(`Stock added`);
    })
})

module.exports = server;
  