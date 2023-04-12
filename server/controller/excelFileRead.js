// seoulData.js
const xlsxFile = require("read-excel-file/node");

async function seoulData(req, res) {
  try {
    const sheets = await xlsxFile("./seoulData.xlsx");

    const dataIndex = [];
    const dataLink = [];
    const dataNmae_STZ = [];
    const dataNmae_Station = [];
    const dataNmae_Park = [];
    const dataName_Other = [];
    const dataLink_STZ = [];
    const dataLink_Park = [];
    const dataLink_Station = [];
    const dataLink_Other = [];

    for (let i = 1; i < sheets.length; i++) {
      dataIndex.push(sheets[i][1]);
      dataLink.push(sheets[i][2]);
    }

    sheets.filter((el) => {
      if (el[0] === 1) {
        dataNmae_STZ.push(el[1]);
        dataLink_STZ.push(el[2]);
      }
      if (el[0] === 2) {
        dataNmae_Park.push(el[1]);
        dataLink_Park.push(el[2]);
      }
      if (el[0] === 3) {
        dataNmae_Station.push(el[1]);
        dataLink_Station.push(el[2]);
      } else {
        dataName_Other.push(el[1]);
        dataLink_Other.push(el[2]);
      }
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
      {
        id: 5,
        name: dataLink,
      },
      {
        id: 6,
        name: dataLink_STZ,
      },
      {
        id: 7,
        name: dataLink_Park,
      },
      {
        id: 8,
        name: dataLink_Station,
      },
    ];
    console.log(Arr[3].name);
    res.status(200).json({ Arr, dataIndex });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { seoulData };
