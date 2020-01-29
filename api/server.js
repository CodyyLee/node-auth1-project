const express = require('express');

const apiRouter = require('../routers/router.js');

const server = express();

const { verify } = require('../middleware/middleware.js');

const session = require('express-session');
server.use(
  session({
    name: 'notsession',
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: true,
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
  })
);

server.use(express.json());

server.use('/api', apiRouter);

module.exports = server;