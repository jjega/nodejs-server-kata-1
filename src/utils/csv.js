module.exports = {

  csvToJson: (paramsObj) => {
    const strData = paramsObj.strData || null;
    const filter = paramsObj.filter || null;
    
    const csv = require('csv-parser');
    let jsonObject = [];
    return new Promise((res, rej) => {
      strData
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        
        if (filter) {
          if(row[filter.label] === filter.value) {
            jsonObject.push(row);
          }
        } else {
          jsonObject.push(row);
        }
        
      })
      .on('end', () => {
        console.log('receive', jsonObject)
        res(jsonObject);
      });
    });
    
  }
}