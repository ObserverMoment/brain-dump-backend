const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

// Import config variables depening on development or production (local or heroku).
const { PORT, DATABASE_URI, CLIENT_URL } = require('./config/envInit');

// Create express app.
const app = express();

// Set up the body parser middleware for both post forms and JSON responses.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow cross origin calls to the endpoints.
app.use(cors())

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Logger middleware.
app.use(morgan('dev'));

// ROUTES
const usersRoutes = require('./routes/usersRoutes.js');
app.use('/users', usersRoutes);
const ideasRoutes = require('./routes/ideasRoutes.js');
app.use('/ideas', ideasRoutes);

// Setup the mongoDB connection and then once connected listen on the stated port.
mongoose.Promise = Promise; // Use global promise library.
mongoose.connect(DATABASE_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
  });
});
