import { useEffect, useState } from "react";
import { Map, MapMarker, MarkerClusterer } from "react-kakao-maps-sdk";
import "./App.css";
import axios from "axios";

function App() {
  const [mapCenter, setMapCenter] = useState({
    lat: 37.566826,
    lng: 126.9786567,
  });
  const [isOpen, setIsOpen] = useState(null);
  const [level, setLevel] = useState(8);

  const [shelters, setShelters] = useState([]);
  const SERVICE_KEY = import.meta.env.VITE_ANIMAL_SHELTER_API_KEY;
  const SHELTER_API = "https://openapi.gg.go.kr/OrganicAnimalProtectionFacilit";
  const MARKER_IMAGE =
    "https://png.pngtree.com/png-vector/20240722/ourmid/pngtree-happy-puppy-icon-png-image_13186551.png";

  useEffect(() => {
    const shelterData = async () => {
      try {
        const response = await axios.get(SHELTER_API, {
          params: { KEY: SERVICE_KEY, Type: "json" },
          timeout: 15000,
        });
        const data = response.data.OrganicAnimalProtectionFacilit;
        const rows = data.find((d) => Array.isArray(d.row)).row;
        const list = rows.map((i) => ({
          name: i.ENTRPS_NM,
          addr: i.REFINE_ROADNM_ADDR,
          lat: Number(i.REFINE_WGS84_LAT),
          lng: Number(i.REFINE_WGS84_LOGT),
        }));
        setShelters(list);
        console.log("유기동물보호소", list);
      } catch (error) {
        console.log(error);
      }
    };
    shelterData();
  }, [SHELTER_API, SERVICE_KEY]);

  const handleMarkerClick = (index, lat, lng) => {
    setIsOpen(index);
    setMapCenter({ lat, lng });
    setTimeout(() => setLevel(6), 400);
  };

  return (
    <div className="mapWrapper">
      <Map className="map" center={mapCenter} level={level} isPanto draggable>
        <MarkerClusterer averageCenter minLevel={8}>
          {shelters.map((s, index) => (
            <MapMarker
              key={`${s.name}-${s.lat}-${s.lng}`}
              position={{
                lat: s.lat,
                lng: s.lng,
              }}
              image={{
                src: MARKER_IMAGE,
                size: { width: 120, height: 120 },
              }}
              clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
              onClick={() => handleMarkerClick(index, s.lat, s.lng)}
            >
              {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
              {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
              {isOpen === index && (
                <div style={{ minWidth: "250px" }}>
                  <img
                    alt="close"
                    width="14"
                    height="13"
                    src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
                    style={{
                      position: "absolute",
                      right: "5px",
                      top: "5px",
                      cursor: "pointer",
                    }}
                    onClick={() => setIsOpen(null)}
                  />
                  <div style={{ padding: "5px", color: "#000" }}>{s.name}</div>
                  <div style={{ padding: "5px", color: "#000" }}>{s.addr}</div>
                </div>
              )}
            </MapMarker>
          ))}
        </MarkerClusterer>
      </Map>
    </div>
  );
}

export default App;
