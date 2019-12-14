
const router = express.Router({ mergeParams: true });
const {csvToJson} = require('../../utils/csv');
const {magazines} = config['data'];

router.get("/", async (req, res) => {
  try {
    const strData = fs.createReadStream(magazines)
    const jsonData = await csvToJson({strData } );
    
    return res.status(200).json({Results: jsonData });
  } catch (error) {
    return res.status(500).json({Error: `Get Error::Magazines ${error}` });
  }
});

router.get("/:isbn", async (req, res) => {
  try {
    const strData = fs.createReadStream(magazines)
    const jsonData = await csvToJson({strData, filter: {label: 'isbn', value: req.params.isbn} } );
    
    return res.status(200).json({Results: jsonData });
  } catch (error) {
    return res.status(500).json({Error: `Get Error::Magazines::Isbn ${error}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, isbn, authors, publishedAt } = req.body;
    const strData = fs.createReadStream(books);
    const jsonData = csvToJson({
      strData,
      filter: { label: "isbn", value: isbn }
    });

    if (!jsonData.length) {
      fs.writeFile(books, `${title};${isbn};${authors};${publishedAt}`+"\t", err => {
        if (err) {
          console.log("Error::Magazin::writeFile", err);
          throw err;
        }
      });
    } else {
      return res.status(401).json({ Error: "EXISTING_ISBN" });
    }

    return res.status(200).json({ title, isbn, authors, publishedAt });
  } catch (error) {
    return res.status(500).json({ Error: `POST Error::Books ${error}` });
  }
});

module.exports = router;