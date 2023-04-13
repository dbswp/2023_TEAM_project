import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from 'react-naver-maps';
import '../../styles/mp-sidebar.scss';

export default function NaverMaps() {
  const navermaps = useNavermaps();
  const point_latitude = localStorage.getItem('latitude');
  const point_longitude = localStorage.getItem('longitude');
  // const marker_location = localStorage.getItem("location");
  // console.log(marker_location);

  const positions = [
    {
      title: '카카오',
      latlng: { lat: 33.450705, lng: 126.570677 },
    },
    {
      title: '생태연못',
      latlng: { lat: 33.450936, lng: 126.569477 },
    },
    {
      title: '텃밭',
      latlng: { lat: 33.450879, lng: 126.56994 },
    },
    {
      title: '근린공원',
      latlng: { lat: 33.451393, lng: 126.570738 },
    },
  ];

  return (
    <>
      {
        <NaverMap
          defaultCenter={new navermaps.LatLng(point_latitude, point_longitude)}
          defaultZoom={15}
        >
          {/* {marker_location?.map((el, idx) => {
            <Marker key={idx} Position={new navermaps.LatLng(el)} />;
          })} */}

          {/* 마커표시 */}
          {/* <Marker
            key={`${positions.title}-${positions.latlng}`}
            position={new navermaps.LatLng`${positions.latlng}`()} // 마커를 표시할 위치
            title={positions.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          /> */}
          <Marker
            key={1}
            position={new navermaps.LatLng(37.551229, 126.988205)}
            animation={2}
            onClick={() => {
              alert('여기는 N서울타워입니다.');
            }}
          />
        </NaverMap>
      }
    </>
  );
}
