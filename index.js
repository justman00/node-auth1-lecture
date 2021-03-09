const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const ConnectSessionKnex = require('connect-session-knex')(session);

const db = require("./database/config")
const usersRouter = require('./users/users-router');

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    resave: false, // asigura necrearea sesiunilor duplicate
    saveUninitialized: false, // GDPR
    secret: 'Keep it secret, keep it safe', // encrypta un token
    store: new ConnectSessionKnex({
      knex: db, // configured instance of knex
      createtable: true, // create a sessions table in the db if it doesn't exist
    }),
  })
);
server.use(usersRouter);

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
