const router = express.Router({ mergeParams: true });
const {csvToJson} = require('../../../utils/csv');
const {books} = config['data'];

router.get("/", async (req, res) => {
  try {
    const strData = fs.createReadStream(books)
    const jsonData = await csvToJson({strData, filter: {label: 'authors', value: req.params.email} } );
    
    return res.status(200).json({Results: jsonData });
  } catch (error) {
    return res.status(500).json({Error: `Get Error::Author::Books ${error}` });
  }
});


module.exports = router;