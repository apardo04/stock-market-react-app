require("dotenv").config();
const express = require('express');
const http = require("http");
const next = require('next');
const session = require("express-session");
const uid = require('uid-safe');

const api = require("./api");

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });

const handle = app.getRequestHandler();


app
  .prepare()
  .then(() => {
    const server = express();

    // 2 - add session management to Express
    const sessionConfig = {
      secret: uid.sync(18),
      cookie: {
        maxAge: 86400 * 1000 // 24 hours in milliseconds
      },
      resave: false,
      saveUninitialized: true
    };
    server.use(session(sessionConfig));

    server.use(api)

    // handling everything else with Next.js
    server.get('*', (req, res) => {
      return handle(req, res)
    })

    http.createServer(server).listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });