// import mongoose connection
const { connect, connection } = require('mongoose');

// environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/skele-social';

// connect to database
connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Connection Error
connection.on('error', console.error.bind(console, 'connection error:'));

// Connection Success
connection.once('open', () => {
  console.log('Connected to the Database');
});

// export the connection
module.exports = connection;