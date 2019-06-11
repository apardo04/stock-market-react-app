const pool = require('./data/config.js')
const express = require('express')
const server = express()

server.get('/api/users', (req, res) => {
    pool.query("SELECT username, email FROM stock_app.user;", (err, rows, fields) => {
        if (err) throw err
        res.send(rows[0])
    })
})

server.get('/api/stocks', (req, res) => {
    pool.query("SELECT stock FROM stock_app.userStocks WHERE userID=2;", (err, rows, fields) => {
        if (err) throw err
        res.send(rows)
    })
})

server.post('/api/stocks', (req, res) => {
    //console.log(req.query.stock)
    pool.query(`INSERT INTO stock_app.userStocks SET userID=${req.query.userID}, stock='${req.query.stock}', dateAdded=NOW();`, (error, result) => {
        if (error) throw error;
        res.status(201).send(`Stock added`);
    })
})

server.get('*', (req, res) => {
    return "Welcome to my API";
})

const port = process.env.PORT || 3001
server.listen(port, err => {
    if (err) throw err;
    console.log(`> Listening on port ${port}`);
});

  