// package imports
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// environment variables
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

// connect to database
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});