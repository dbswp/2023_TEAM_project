const fs = require('fs');
const path = require('path');
const FILE_NAME = 'coordinates.csv';

const csvPath = path.join(__dirname, '../../client/public', 'data', FILE_NAME);

const csv = fs.readFileSync(csvPath, 'utf-8');
const csvData = csv.split('\r\n');
const locationData = csvData.map((el) => el.split(','));

let newData = [];

for (let i = 1; i < locationData.length - 1; i += 1) {
  newData.push(locationData[i]);
}

console.log(newData);
