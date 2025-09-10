import React, { useEffect, useRef, useState } from "react";
import mapMarker from "../../images/user/i_map_marker.svg";
import mapMyposition from "../../images/user/i_my_position.svg";
import mapMypositionLarge from "../../images/user/i_my_position_lg.svg";
import mapMarkerHit from "../../images/user/i_map_marker_hit.svg";

const PharmacyMap = ({ onMarkerClick, selectedPharmacy, currentPosition }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const activeMarkerRef = useRef(null);
  const myLocationMarkerRef = useRef(null);

  const [pharmacyList, setPharmacyList] = useState([]);

  const myPosition = currentPosition ? { lat: currentPosition.lat, lng: currentPosition.lng } : null;

  
  useEffect(() => {


    if (!window.naver || !mapRef.current || !currentPosition) return;


    const map = new window.naver.maps.Map(mapRef.current, {
      center: currentPosition ? new window.naver.maps.LatLng(currentPosition.lat, currentPosition.lng) : new window.naver.maps.LatLng(37.4979517, 127.0276188),
      zoom: 15,
    });

    // 내 위치 마커 표시
    if (currentPosition) {
      if (myLocationMarkerRef.current) myLocationMarkerRef.current.setMap(null);

      myLocationMarkerRef.current = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(currentPosition.lat, currentPosition.lng),
        map,
        icon: {
          url: mapMypositionLarge,
          size: new window.naver.maps.Size(26, 26),
          anchor: new window.naver.maps.Point(13, 13),
        },
      });

      map.setCenter(new window.naver.maps.LatLng(currentPosition.lat, currentPosition.lng));
    }

    // 내 위치 버튼 생성
    const buttonDiv = document.createElement("div");
      buttonDiv.style.position = "absolute";
      buttonDiv.style.top = "16px";
      buttonDiv.style.right = "16px";
      buttonDiv.style.zIndex = 1000;

    const button = document.createElement("button");
      button.style.background = "#fff";
      button.style.border = "1px solid #ccc";
      button.style.borderRadius = "20px";
      button.style.boxShadow = "rgba(0, 0, 0, 0.3)";
      button.style.padding = "4px 8px";
      button.style.cursor = "pointer";
      button.style.display = "flex";
      button.style.alignItems = "center";
      button.style.gap = "4px";

    const img = document.createElement("img");
      img.src = mapMyposition;
      img.style.width = "16px";
      img.style.height = "16px";

    const span = document.createElement("span");
      span.textContent = "내 위치";

    button.appendChild(img);
    button.appendChild(span);
    buttonDiv.appendChild(button);
    mapRef.current.appendChild(buttonDiv);

    button.addEventListener("click", () => {
      const latLng = new window.naver.maps.LatLng(myPosition.lat, myPosition.lng);
      map.panTo(latLng);

      if (myLocationMarkerRef.current) {
        myLocationMarkerRef.current.setMap(null);
      }

      myLocationMarkerRef.current = new window.naver.maps.Marker({
        position: latLng,
        map,
        icon: {
          url: mapMypositionLarge,
          size: new window.naver.maps.Size(26, 26),
          anchor: new window.naver.maps.Point(13, 13),
        },
      });
    });


  // CORS(Cross-Origin Resource Sharing) 로 약국 정보 못 가지고 옴.. 일단 소스는 만들어 났는데 테스트를 못해봄...


  // 약국 검색 REST API 호출
  fetch(
    `https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=약국&coordinate=${currentPosition.lng},${currentPosition.lat}&radius=1000&sort=distance`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "1uzxn48abj",
        "X-NCP-APIGW-API-KEY": "mIJ9XvCfQu9c0yXOArDMWvd9NQ9hNI9X0BXPzUfo",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      data.places.forEach((item) => {
        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(item.y, item.x),
          map,
          title: item.name,
          icon: {
            url: mapMarker,
            size: new window.naver.maps.Size(32, 32),
            anchor: new window.naver.maps.Point(16, 32),
          },
        });

        marker.addListener("click", () => {
          if (activeMarkerRef.current && activeMarkerRef.current !== marker) {
            activeMarkerRef.current.setIcon({
              url: mapMarker,
              size: new window.naver.maps.Size(32, 32),
              anchor: new window.naver.maps.Point(16, 32),
            });
          }

          marker.setIcon({
            url: mapMarkerHit,
            size: new window.naver.maps.Size(42, 52.77),
            anchor: new window.naver.maps.Point(21, 52.77),
          });

          activeMarkerRef.current = marker;
          if (onMarkerClick) onMarkerClick(item);
        });

        markersRef.current.push(marker);
      });
    })
    .catch((err) => console.error(err));
}, [currentPosition]);

  return <div ref={mapRef} className="naver-map-box" />;
};

export default PharmacyMap;

