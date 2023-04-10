// seoulData.js
const xlsxFile = require("read-excel-file/node");

async function seoulData(req, res) {
  try {
    const sheets = await xlsxFile("./seoulData.xlsx");

    const dataIndex = [];
    const dataNmae_STZ = [];
    const dataNmae_Station = [];
    const dataNmae_Park = [];
    const dataName_Other = [];

    for (let i = 1; i < sheets.length; i++) {
      dataIndex.push(sheets[i][1]);
    }

    dataIndex.filter((el) => {
      if (el.includes("관광특구") === true) dataNmae_STZ.push(el);
      else if (el.includes("역") === true) dataNmae_Station.push(el);
      else if (el.includes("공원") === true || el.includes("숲") === true)
        dataNmae_Park.push(el);
      else dataName_Other.push(el);
    });

    const Arr = [
      {
        id: 1,
        name: dataNmae_STZ,
      },
      {
        id: 2,
        name: dataNmae_Station,
      },
      {
        id: 3,
        name: dataNmae_Park,
      },
      {
        id: 4,
        name: dataName_Other,
      },
    ];

    res.status(200).json({ dataIndex, Arr });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { seoulData };
