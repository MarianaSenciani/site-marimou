const fs = require('fs');
const data = JSON.parse(fs.readFileSync('fullCV.json', 'utf8'));
fs.writeFileSync('src/data.js', 'export const initialCVData = ' + JSON.stringify(data, null, 2) + ';');
