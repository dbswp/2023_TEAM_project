import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  RenderAfterNavermapsLoaded,
  InfoWindow,
  Polygon,
  Polyline,
} from 'react-naver-maps';
import '../../styles/mp-sidebar.scss';
import Papa from 'papaparse';
import { useGlobalContext } from './Context';

export default function NaverMaps() {
  const { wantMyLocation } = useGlobalContext();
  const [coordinates, setCoordinates] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  const navermaps = useNavermaps();

  //50개 지역의 마커 표시를 위한 위도, 경도 값을 로컬스토리지에서 가져와서 변수에 저장
  const point_latitude = localStorage.getItem('latitude');
  const point_longitude = localStorage.getItem('longitude');

  // react naver maps의 geolocation 사용을 위한 코드
  // 아래 58번줄에 있는 navigator.geolocation.getCurrentPosition()의 콜백함수로 들어간다.
  const onSuccessGeolocation = (position) => {
    if (!map || !infowindow) return;
    //콘솔로 찍어보면 현재 위치의 위도, 경도값에 (position.coords.위도 or 경도) 형태로 접근할 수 있다.
    const location = new navermaps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    //사용자 위치를 지도 중앙에 위치시키는 코드
    map.setCenter(location);

    infowindow.setContent(
      '<div style="padding:20px;">' + '현재 사용자 위치' + '</div>'
    );
    infowindow.open(map, location);
  };

  //인구밀집도가 일정 레벨이상이 되면 밑의 sendKakaoAccessToken을 실행
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

    if (wantMyLocation) {
      navigator.geolocation.getCurrentPosition(onSuccessGeolocation, null);
    }
  }, [wantMyLocation]);

  return (
    <>
      <NaverMap
        defaultCenter={new navermaps.LatLng(point_latitude, point_longitude)}
        defaultZoom={16}
        ref={setMap}
      >
        <InfoWindow ref={setInfowindow} />
        {/* 마커표시 */}
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            position={
              new navermaps.LatLng(coordinate.latitude, coordinate.longitude)
            }
            animation={navermaps.Animation.NONE}
            name={coordinate.name}
            onClick={() => {
              localStorage.setItem('END_POINT', coordinate.name);
              localStorage.setItem('latitude', coordinate.latitude);
              localStorage.setItem('longitude', coordinate.longitude);
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
