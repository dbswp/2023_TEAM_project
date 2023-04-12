import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
// import { readXlsxFile } from "./excelFileRead";
import styles from "../../styles/mp-sidebar.scss";

export default function NaverMaps() {
  const navermaps = useNavermaps();

  return (
    <>
      {
        <NaverMap
          defaultCenter={new navermaps.LatLng(37.3595704, 127.105399)}
          defaultZoom={15}
        >
          <Marker Position={new navermaps.LatLng(37.3595704, 127.105399)} />
        </NaverMap>
      }
    </>
  );
}
