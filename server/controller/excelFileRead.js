const { table } = require("console");
const xlsxFile = require("read-excel-file/node");

xlsxFile("../../seoulData.xlsx").then((sheets) => {
  const dataIndex = [];
  for (let i = 1; i < sheets.length; i++) {
    dataIndex.push();
  }
  console.log(sheets[0]);
});
