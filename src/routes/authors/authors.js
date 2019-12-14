const router = express.Router({ mergeParams: true });
const {authors} = config['data'];
const {csvToJson} = require('../../utils/csv');

////////////// Import Routes ////////////
const books = require("./books/books");
////////////////////////////////////////////////

/////////// Use Routes /////////////////
router.use("/:email/books", books);
////////////////////////////////////////////////

router.get("/", async (req, res) => {
  try {
    const strData = fs.createReadStream(authors)
    const jsonData = await csvToJson({strData: strData });

    return res.status(200).json({Results: jsonData });
  } catch (error) {
    return res.status(500).json({Error: `Get Error::Author ${error}` });
  }
});

module.exports = router;