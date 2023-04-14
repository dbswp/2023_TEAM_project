import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  RenderAfterNavermapsLoaded,
  Polygon,
  Polyline,
} from 'react-naver-maps';
import '../../styles/mp-sidebar.scss';
import Papa from 'papaparse';

export default function NaverMaps() {
  const [coordinates, setCoordinates] = useState([]);

  //인구밀집도가 일정 레벨이상이 되면 sendKakaoAccessToken을 실행
  const sendKakaoAccessToken = async () => {
    //로컬 스토리지에 있는 카카오 엑세스 토큰을 요청body에 담아서
    const kakao_access_token = window.localStorage.getItem('kakaoAccessToken');
    //알림기능 미들웨어로 Post요청 전송
    await axios.post('http://localhost:4000/push', {
      kakao_access_token,
    });
  };

  useEffect(() => {
    Papa.parse('/data/coordinates.csv', {
      download: true,
      header: true,
      complete: function (results) {
        setCoordinates(results.data);
      },
    });
  }, []);

  const navermaps = useNavermaps();
  const point_latitude = localStorage.getItem('latitude');
  const point_longitude = localStorage.getItem('longitude');

  return (
    <>
      <NaverMap
        defaultCenter={new navermaps.LatLng(point_latitude, point_longitude)}
        defaultZoom={15}
      >
        {/* 마커표시 */}
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            position={
              new navermaps.LatLng(coordinate.latitude, coordinate.longitude)
            }
            animation={navermaps.Animation.NONE}
            onClick={() => {
              window.localStorage.setItem('END_POINT', coordinate.name);
              window.localStorage.setItem('latitude', coordinate.latitude);
              window.localStorage.setItem('longitude', coordinate.longitude);
              window.location.reload();
            }}
          />
        ))}

        <Polyline
          clickable={true}
          strokeColor="blue"
          strokeStyle="solid"
          strokeWeight={1}
          path={[
            new navermaps.LatLng(37.359924641705476, 127.1148204803467),
            new navermaps.LatLng(37.36343797188166, 127.11486339569092),
            new navermaps.LatLng(37.368520071054576, 127.11473464965819),
            new navermaps.LatLng(37.3685882848096, 127.1088123321533),
            new navermaps.LatLng(37.37295383612657, 127.10876941680907),
            new navermaps.LatLng(37.38001321351567, 127.11851119995116),
            new navermaps.LatLng(37.378546827477855, 127.11984157562254),
            new navermaps.LatLng(37.376637072444105, 127.12052822113036),
            new navermaps.LatLng(37.37530703574853, 127.12190151214598),
            new navermaps.LatLng(37.371657839593894, 127.11645126342773),
            new navermaps.LatLng(37.36855417793982, 127.1207857131958),
          ]}
        />
        <Polygon
          fillColor="salmon"
          fillOpacity={0.35}
          clickable={true}
          paths={[
            new navermaps.LatLng(37.359924641705476, 127.1148204803467),
            new navermaps.LatLng(37.36343797188166, 127.11486339569092),
            new navermaps.LatLng(37.368520071054576, 127.11473464965819),
            new navermaps.LatLng(37.3685882848096, 127.1088123321533),
            new navermaps.LatLng(37.37295383612657, 127.10876941680907),
            new navermaps.LatLng(37.38001321351567, 127.11851119995116),
            new navermaps.LatLng(37.378546827477855, 127.11984157562254),
            new navermaps.LatLng(37.376637072444105, 127.12052822113036),
            new navermaps.LatLng(37.37530703574853, 127.12190151214598),
            new navermaps.LatLng(37.371657839593894, 127.11645126342773),
            new navermaps.LatLng(37.36855417793982, 127.1207857131958),
          ]}
        />
      </NaverMap>
    </>
  );
}
