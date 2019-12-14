
const { csvToJson } = require("./utils/csv");
const config = require("./config/config");
const fs = require("fs");
const { magazines, authors, books } = config["data"];

describe("Transform CSV to JSON ", function() {
  it("Should be return this Magazine object", async function() {
    const strData = fs.createReadStream(magazines);
    const jsonData = await csvToJson({
      strData,
      filter: { label: "isbn", value: "5454-5587-3210" }
    });

    expect(jsonData).to.equal([
      {
        title: "Beautiful cooking",
        isbn: "5454-5587-3210",
        authors: "null-walter@echocat.org",
        publishedAt: "21.05.2011"
      }
    ]);
  });

  it("Should be return this Books object", async function() {
    const strData = fs.createReadStream(books);
    const jsonData = await csvToJson({
      strData,
      filter: { label: "isbn", value: "5554-5545-4518" }
    });

    expect(jsonData).to.equal([
      {
        title: "Ich helfe dir kochen. Das erfolgreiche Universalkochbuch mit großem Backteil",
        isbn: "5554-5545-4518",
        authors: "null-walter@echocat.org",
        description:
          "Auf der Suche nach einem Basiskochbuch steht man heutzutage vor einer Fülle von Alternativen. Es fällt schwer, daraus die für sich passende Mixtur aus Grundlagenwerk und Rezeptesammlung zu finden. Man sollte sich darüber im Klaren sein, welchen Schwerpunkt man setzen möchte oder von welchen Koch- und Backkenntnissen man bereits ausgehen kann."
      }
    ]);
  });
});
