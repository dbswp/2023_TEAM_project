import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";

import styles from "../../styles/mp-sidebar.scss";

export default function NaverMaps() {
  const navermaps = useNavermaps();
  const point_latitude = localStorage.getItem("latitude");
  const point_longitude = localStorage.getItem("longitude");
  // const marker_location = localStorage.getItem("location");
  // console.log(marker_location);

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
        </NaverMap>
      }
    </>
  );
}
