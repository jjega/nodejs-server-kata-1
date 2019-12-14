const path = require('path');

module.exports = {
  data : {
    authors: path.join(__dirname, '../../data/authors.csv'),
    books: path.join(__dirname, '../../data/books.csv'),
    magazines: path.join(__dirname, '../../data/magazines.csv'),
  },
  
};