import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
  InfoWindow,
  Circle,
} from 'react-naver-maps';
import '../../styles/mp-sidebar.scss';
import { useGlobalContext } from './Context';

export default function NaverMaps({ locationData, data }) {
  const { wantMyLocation, endPoint, changeEndPoint } = useGlobalContext();
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [location, setLocation] = useState({});

  const navermaps = useNavermaps();

  //인구밀집도가 일정 레벨이상이 되면 밑의 sendKakaoAccessToken을 실행
  const sendKakaoAccessToken = async () => {
    //로컬 스토리지에 있는 카카오 엑세스 토큰을 요청body에 담아서
    const kakao_access_token = window.localStorage.getItem('kakaoAccessToken');
    //알림기능 미들웨어로 Post요청 전송
    await axios.post('http://localhost:4000/push', {
      kakao_access_token,
    });
  };

  //50개 지역의 마커 표시를 위한 위도, 경도 값을 로컬스토리지에서 가져와서 변수에 저장
  const point_latitude = localStorage.getItem('latitude');
  const point_longitude = localStorage.getItem('longitude');

  ///50개 지역의 마커 표시를 해주는 함수
  const makeMarkerBoundary = () => {
    let color;
    // 데이터의 인구혼잡도에 따라 오버레이 색상을 다르게 보여줌
    if (
      data?.AREA_CONGEST_LVL[0] === '혼잡' ||
      data?.AREA_CONGEST_LVL[0] === '붐빔'
    ) {
      color = 'red';
    } else if (
      data?.AREA_CONGEST_LVL[0] === '보통' ||
      data?.AREA_CONGEST_LVL[0] === '약간 붐빔'
    ) {
      color = 'orange';
    } else {
      color = 'green';
    }
    return locationData?.map((coordinate, index) => (
      <React.Fragment key={index}>
        <Circle
          center={new navermaps.LatLng(coordinate[0], coordinate[1])}
          radius={300}
          strokeColor={
            coordinate[2].trim() === localStorage.getItem('END_POINT')
              ? color
              : null
          }
          fillColor={
            coordinate[2].trim() === localStorage.getItem('END_POINT')
              ? color
              : null
          }
          fillOpacity={0.1}
        />
        <Marker
          key={index}
          position={new navermaps.LatLng(coordinate[0], coordinate[1])}
          animation={navermaps.Animation.NONE}
          name={coordinate.name}
          onClick={() => {
            localStorage.setItem('END_POINT', coordinate[2].trim()); //마커를 클릭하면 로컬스토리지의 'END_POINT' 값을 데이터의 지역명으로 바꿈
            localStorage.setItem('latitude', coordinate[0]); //로컬스토리지의 'latitude' 값을 데이터의 위도 값 으로 바꿈
            localStorage.setItem('longitude', coordinate[1]); //로컬스토리지의 'longitude' 값을 데이터의 경도 값 으로 바꿈
            changeEndPoint(); // 블로그 컴포넌트에서 바뀐 로컬스토리지 값을 바탕으로 데이터 요청을 실행 시키기 위해 blog컴포넌트의 useEffect를 재실행 시킴
            console.log(endPoint);
          }}
        />
        <InfoWindow
          key={coordinate[2]}
          position={new navermaps.LatLng(coordinate[0], coordinate[1])}
          content={`<div>${coordinate[2]}</div>`}
        />
      </React.Fragment>
    ));
  };

  const successCallback = (position) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });

    const naverLocation = new navermaps.LatLng(
      location?.latitude,
      location?.longitude
    );
    console.log(location);

    map.setCenter(naverLocation);

    infowindow?.setContent(
      '<div style="padding:12px;">' + '내 위치' + '</div>'
    );
    infowindow?.open(map, naverLocation);
  };

  useEffect(() => {
    let watcher = null;

    console.log(wantMyLocation);

    if (wantMyLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });

      watcher = navigator.geolocation.watchPosition(successCallback, null);
    }

    return () => {
      navigator.geolocation.clearWatch(watcher);
    };
  }, [wantMyLocation]);

  //여기서 부터 Dom요소 //////////
  return (
    <>
      <NaverMap
        defaultCenter={new navermaps.LatLng(point_latitude, point_longitude)}
        defaultZoom={16}
        ref={setMap}
      >
        <InfoWindow ref={setInfowindow} />
        {makeMarkerBoundary()}
      </NaverMap>
    </>
  );
}
