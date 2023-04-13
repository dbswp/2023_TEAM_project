// seoulData.js
const xlsxFile = require("read-excel-file/node");

async function seoulData(req, res) {
  try {
    const sheets = await xlsxFile("./seoulData.xlsx");

    const dataIndex = [];
    const dataLink = [];
    const dataLatitude = [];
    const dataLongitude = [];
    const dataNmae_STZ = [];
    const dataNmae_Station = [];
    const dataNmae_Park = [];
    const dataLink_STZ = [];
    const dataLink_Park = [];
    const dataLink_Station = [];

    for (let i = 1; i < sheets.length; i++) {
      dataIndex.push(sheets[i][1]);
      dataLink.push(sheets[i][2]);
      dataLatitude.push(sheets[i][3]);
      dataLongitude.push(sheets[i][4]);
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
      }
    });

    const Arr = [
      {
        // 특구 관련 데이터
        id: 1,
        name: dataIndex,
        img: dataLink,
        latitude: dataLatitude,
        longitude: dataLongitude,
      },
      {
        id: 2,
        name: dataNmae_STZ,
        img: dataLink_STZ,
      },
      {
        id: 3,
        name: dataNmae_Station,
        img: dataLink_Station,
      },
      {
        id: 4,
        name: dataNmae_Park,
        img: dataLink_Park,
      },
    ];

    res.status(200).json({ Arr });
  } catch (err) {
    console.error(err);
  }
}

module.exports = { seoulData };
