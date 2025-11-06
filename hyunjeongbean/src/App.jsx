import { useEffect, useState } from "react";
import { Map, Polygon, MapMarker } from "react-kakao-maps-sdk";
import "./App.css";

function App() {
  const [mapCenter] = useState({ lat: 37.566826, lng: 126.9786567 });
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handlePolygonClick = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    console.log(`다각형이 ${count}번 클릭되었습니다.`);
  }, [count]);

  return (
    <div className="mapWrapper">
      <Map className="map" center={mapCenter} level={8} draggable>
        <Polygon
          path={[
            { lat: 37.48810143111946, lng: 126.82452978219033 },
            { lat: 37.48695810335867, lng: 126.8251713008845 },
            { lat: 37.486670200045545, lng: 126.82545464527402 },
            { lat: 37.48637306909926, lng: 126.8255910192975 },
            { lat: 37.48648143982792, lng: 126.82576037101748 },
            { lat: 37.486591139557376, lng: 126.82683427430024 },
            { lat: 37.48673551555281, lng: 126.82698093138627 },
            { lat: 37.48729418769895, lng: 126.82701356403113 },
            { lat: 37.48802325474698, lng: 126.82650306144517 },
            { lat: 37.48835113956948, lng: 126.82583517879134 },
            { lat: 37.48856577528182, lng: 126.82474918693414 },
          ]}
          strokeWeight={2}
          strokeColor={"#000"}
          strokeOpacity={0.8}
          fillColor={isMouseOver ? "#ff4000" : "#ffac13"} // 채우기 색깔입니다
          fillOpacity={isMouseOver ? 0.8 : 0.5} // 채우기 불투명도 입니다
          onMouseover={() => setIsMouseOver(true)}
          onMouseout={() => setIsMouseOver(false)}
          onMousedown={() => {
            handlePolygonClick();
          }}
        />
        <MapMarker
          position={{
            // 인포윈도우가 표시될 위치
            lat: 37.48750415432594,
            lng: 126.82580887749724,
          }}
          clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
          onClick={() => setIsOpen(true)}
        >
          {/* MapMarker의 자식을 넣어줌으로 해당 자식이 InfoWindow로 만들어지게 합니다 */}
          {/* 인포윈도우에 표출될 내용으로 HTML 문자열이나 React Component가 가능합니다 */}
          {isOpen && (
            <div style={{ minWidth: "150px" }}>
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
                onClick={() => setIsOpen(false)}
              />
              <div style={{ padding: "5px", color: "#000" }}>성공회대학교</div>
            </div>
          )}
        </MapMarker>
      </Map>
    </div>
  );
}

export default App;
