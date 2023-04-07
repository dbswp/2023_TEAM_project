const fetchData = require('./fetchData');
const PopulationData = require('../models/populationSchema');
const mongooseConnect = require('./mongooseConnect');

mongooseConnect();

const datarefreshing = async () => {
  try {
    const data = await fetchData();
    //지역 엔드포인트가 바뀔때마다 DB데이터 전체 삭제후 재색인
    await PopulationData.deleteMany({});
    await PopulationData.create(data);
    console.log('데이터 갱신 완료');
  } catch (err) {
    console.error(err);
  }
};

const sendData = async (req, res) => {
  try {
    const data = await PopulationData.find({});
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json('something went wrong...');
  }
};

datarefreshing();

module.exports = {
  datarefreshing,
  sendData,
};
