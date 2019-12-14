// GLOBAL
express = require('express');
config = require('./config/config');
fs = require('fs');

// LOCAL
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


// Import Routes
const authors = require('./routes/authors/authors');
const books = require('./routes/books/books');
const magazines = require('./routes/magazines/magazines');

// Sanitize input
app.use(bodyParser.json());

// Allow Crossdomain
app.use(cors());

// Routing
app.use('/authors', authors);
app.use('/books', books);
app.use('/magazines', magazines);



module.exports = app
