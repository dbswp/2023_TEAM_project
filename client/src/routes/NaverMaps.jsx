import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from 'react-naver-maps';

export default function NaverMaps() {
  const navermaps = useNavermaps();
  const [area, setArea] = useState();
  const [data, setData] = useState();

  const getData = async () => {
    const res = await axios.get('http://localhost:4000/data/getdata');
    res.status === 200 ? console.log(res.status) : console.log(res.json());
    console.log(res.data[0].live_data);
    setArea((cur) => res.data[0].area_name);
    setData((cur) => res.data[0].live_data.AREA_CONGEST_MSG[0]);
  };

  useEffect(() => {
    getData();

    //10분마다 데이터 갱신 시키기
    const reNew = setInterval(() => {
      getData();
      console.log('데이터 갱신 완료');
    }, 600000);

    // return clearInterval(reNew);
  }, []);

  return (
    <>
      {/* <NaverMap
        defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
        defaultZoom={15}
      >
        <Marker
          defaultPosition={new navermaps.LatLng(37.3595704, 127.105399)}
        />
      </NaverMap> */}

      <h1>{area}</h1>
      <h2>{data}</h2>
    </>
  );
}
