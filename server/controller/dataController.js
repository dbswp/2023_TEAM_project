const fetchData = require('./fetchData');
const fetchWeatherData = require('./fetchWeatherData');
const PopulationData = require('../models/populationSchema');
const WeatherData = require('../models/weatherSchema');
const mongooseConnect = require('./mongooseConnect');

mongooseConnect();

const datarefreshing = async (END_POINT) => {
  console.log(END_POINT);
  try {
    const data = await fetchData(END_POINT);
    const weather = await fetchWeatherData(END_POINT);

    //지역 엔드포인트가 바뀔때마다 DB데이터 전체 삭제후 재색인
    await PopulationData.deleteMany({});
    await PopulationData.create(data);
    //날씨 데이터도 마찬가지
    await WeatherData.deleteMany({});
    await WeatherData.create(weather);

    console.log('데이터 갱신 완료');
  } catch (err) {
    console.error(err);
  }
};

const sendData = async (req, res) => {
  try {
    const END_POINT = req.body.END_POINT;
    await datarefreshing(END_POINT);

    const data = await PopulationData.find({});
    const weather = await WeatherData.find({});
    res.status(200).json({ data, weather });
  } catch (err) {
    console.error(err);
    res.status(500).json('something went wrong...');
  }
};

module.exports = {
  datarefreshing,
  sendData,
};
