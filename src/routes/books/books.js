const router = express.Router({ mergeParams: true });
const { csvToJson } = require("../../utils/csv");
const { books } = config["data"];

router.get("/", async (req, res) => {
  try {
    const strData = fs.createReadStream(books);
    const jsonData = await csvToJson({ strData });

    return res.status(200).json({ Results: jsonData });
  } catch (error) {
    return res.status(500).json({ Error: `Get Error::Books ${error}` });
  }
});

router.get("/:isbn", async (req, res) => {
  try {
    const strData = fs.createReadStream(books);
    const jsonData = csvToJson({
      strData,
      filter: { label: "isbn", value: req.params.isbn }
    });

    return res.status(200).json({ Results: jsonData });
  } catch (error) {
    return res.status(500).json({ Error: `Get Error::Books ${error}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, isbn, authors, description } = req.body;
    const strData = fs.createReadStream(books);
    const jsonData = csvToJson({
      strData,
      filter: { label: "isbn", value: isbn }
    });

    if (!jsonData.length) {
      fs.writeFile(books, `${title};${isbn};${authors};${description}`+"\t", err => {
        if (err) {
          console.log("Error::errorHandler::writeFile", err);
          throw err;
        }
      });
    } else {
      return res.status(401).json({ Error: "EXISTING_ISBN" });
    }

    return res.status(200).json({ title, isbn, authors, description });
  } catch (error) {
    return res.status(500).json({ Error: `POST Error::Books ${error}` });
  }
});

module.exports = router;
