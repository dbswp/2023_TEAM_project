import React from 'react';
import axios from 'axios';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
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
  const [circleBounds, setCircleBounds] = useState(true);
  const polygon = [];

  const navermaps = useNavermaps();

  //각 마커 아래에 표시되어있는 원의 바운더리를 구하기 위해 그냥 중심좌표와 반지름이 똑같은 원을 새로 만들어버림..ㅋ
  //왜냐하면 개같은 Circle컴포넌트는 프로퍼티로 getBounds 메서드를 제공하지 않기 때문이다
  // makeMarkerBoundary 함수 안에서 상속받은 좌표값을 파라미터로 받아서 활용
  const getboundary = (coordinate) => {
    //circleBounds의 상태가 true이면 실행
    if (circleBounds) {
      const boundary = new navermaps.Circle({
        map: map,
        fillOpacity: 0,
        fillColor: null,
        strokeColor: null,
        center: new navermaps.LatLng(coordinate[0], coordinate[1]),
        radius: 400,
      }).getBounds();

      //위에서 바운더리를 구하면 상태값을 false로 바꿔주어, 새 원들이 한번씩만 생성되도록 했다.
      //지금 보고 있는 getBoundary 함수는 다른 마커를 클릭하면 호출되는 makeMarkerBoundary함수 안에 있기 때문에 마커가 클릭될때마다 계속 재실행이 된다.
      //그렇게 된다면 네이버맵스상에 원이 계속 생성되어 누적되고 성능저하로 이어짐,,, 그래서 circleBounds의 상태값을 조건으로 걸어 계속된 Circle의 생성을 제한
      setCircleBounds((cur) => false);

      const path = [
        new navermaps.LatLng(boundary._ne.y, boundary._sw.x), // 왼쪽 위
        new navermaps.LatLng(boundary._ne.y, boundary._ne.x), // 오른쪽 위
        new navermaps.LatLng(boundary._sw.y, boundary._ne.x), // 오른쪽 아래
        new navermaps.LatLng(boundary._sw.y, boundary._sw.x), // 왼쪽 아래
      ];

      const polygons = new navermaps.Polygon({
        paths: path,
        fillColor: 'red',
        fillOpacity: 0.5,
        strokeColor: 'red',
      });
      polygon.push(polygons);
      polygons.setMap(map);

      if (
        // !navermaps?.geometry?.polygon.containsLatLng(
        //   polygon,
        //   navigator.geolocation.getCurrentPosition((position) => {}, null)
        // ) &&
        polygon.filter((item) => {
          if (
            item ===
            navigator.geolocation.getCurrentPosition((position) => {}, null)
          ) {
            console.log(item);
          }
        })
      ) {
        // console.log('지정 폴리곤내에 감지됨');
      }
    }
  };

  const sendKakaoAccessToken = useCallback(
    //인구밀집도가 일정 레벨이상이 되면 밑의 sendKakaoAccessToken을 실행
    async () => {
      //로컬 스토리지에 있는 카카오 엑세스 토큰을 요청body에 담아서
      const kakao_access_token =
        window.localStorage.getItem('kakaoAccessToken');
      //알림기능 미들웨어로 Post요청 전송
      await axios.post('http://localhost:4000/push', {
        kakao_access_token,
      });
    }
  );

  //50개 지역의 마커 표시를 위한 위도, 경도 값을 로컬스토리지에서 가져와서 변수에 저장
  const point_latitude = localStorage.getItem('latitude');
  const point_longitude = localStorage.getItem('longitude');

  const handleClick = (coordinate) => {
    localStorage.setItem('END_POINT', coordinate[2].trim()); //마커를 클릭하면 로컬스토리지의 'END_POINT' 값을 데이터의 지역명으로 바꿈
    localStorage.setItem('latitude', coordinate[0]); //로컬스토리지의 'latitude' 값을 데이터의 위도 값 으로 바꿈
    localStorage.setItem('longitude', coordinate[1]); //로컬스토리지의 'longitude' 값을 데이터의 경도 값 으로 바꿈
    changeEndPoint(); // 블로그 컴포넌트에서 바뀐 로컬스토리지 값을 바탕으로 데이터 요청을 실행 시키기 위해 blog컴포넌트의 useEffect를 재실행 시킴
  };

  ///50개 지역의 마커 표시를 해주는 함수
  const makeMarkerBoundary = () => {
    const msg = data?.AREA_CONGEST_LVL[0];
    let color;
    // 데이터의 인구혼잡도에 따라 오버레이 색상을 다르게 보여줌
    if (msg === '혼잡' || msg === '붐빔') {
      color = 'red';
    } else if (msg === '보통' || msg === '약간 붐빔') {
      color = 'orange';
    } else {
      color = 'green';
    }
    return locationData?.map((coordinate, index) => (
      <React.Fragment key={index}>
        <Circle
          key={index}
          center={new navermaps.LatLng(coordinate[0], coordinate[1])}
          radius={400}
          fillColor={
            coordinate[2].trim() === localStorage.getItem('END_POINT')
              ? color
              : null
          }
          strokeColor={
            coordinate[2].trim() === localStorage.getItem('END_POINT')
              ? color
              : null
          }
          fillOpacity={0.2}
        />
        <Marker
          key={coordinate}
          position={new navermaps.LatLng(coordinate[0], coordinate[1])}
          animation={navermaps.Animation.NONE}
          name={coordinate.name}
          onClick={() => handleClick(coordinate)}
        />
        {getboundary(coordinate, color)}
      </React.Fragment>
    ));
  };

  // geolocation의 watchPosition메서드의 성공 콜백으로 들어가는 함수
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

    map?.setCenter(naverLocation);

    infowindow?.setContent(
      '<div style="padding:25px;">' + '내 위치' + '</div>'
    );
    infowindow?.open(map, naverLocation);
  };

  useEffect(() => {
    let watcher = null;

    if (wantMyLocation) {
      window.alert('현재 이용자 위치 추적중입니다.');
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
