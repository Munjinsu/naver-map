import React, { useState, useEffect } from 'react';
import style from './PharmacyFind.module.css';
import HeadSub from '../../components/comm/HeadSub';

import { useNavigate } from 'react-router-dom';
import iconLocation from '../../images/user/i_location_lg.svg';
import PharmacyDetailsBox from '../../components/box/PharmacyDetailsBox';
import PharmacyMap from '../../components/box/PharmacyMap';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';


const API_KEY =
  'gNWlsuZo1Dt2K0CNRkS7Co44D2zG4vY7EW3dTaPWUz76WfwiSIeIMorwKLttfQnKHKsX5RAmFqBfVRdx7%2BdCBQ%3D%3D';


function parseHHmmToMinutes(timeStr) {
  if (!timeStr) return null;
  const t = String(timeStr).replace(/\D/g, '');
  if (t.length < 3) return null;
  const hh = parseInt(t.slice(0, t.length - 2), 10);
  const mm = parseInt(t.slice(-2), 10);
  return hh * 60 + mm;
}

/**
 * 화면에 표시할 "HH:MM" 포맷 반환.
 * 24 이상인 시(hour)는 24를 빼서 다음날 시간으로 표시합니다 (예: 2500 -> 01:00).
 */
function formatTime(timeStr) {
  if (!timeStr) return ' - ';
  let t = String(timeStr).replace(/\D/g, '');
  if (t.length < 3) t = t.padStart(4, '0');
  let hh = parseInt(t.slice(0, t.length - 2), 10);
  const mm = t.slice(-2);
  if (hh >= 24) {
    hh = hh - 24; // 다음날 시간으로 표기
  }
  const hhStr = String(hh).padStart(2, '0');
  return `${hhStr}:${mm}`;
}

/**
 * 현재 시간이 start~end 사이인지 체크 (true/false).
 * - start/end 는 "0900" 같은 원본 문자열로 전달.
 * - end <= start 이면 다음날로 넘어가는 구간으로 간주 (ex. 18:00 ~ 02:00)
 * - end 값이 2500 같이 24시 초과이면 정상 처리 (25:00 -> 01:00 다음날)
 */
function isNowBetween(startStr, endStr) {
  const startMin = parseHHmmToMinutes(startStr);
  const endMin = parseHHmmToMinutes(endStr);
  if (startMin == null || endMin == null) return false;

  let s = startMin;
  let e = endMin;

  // end <= start 이면 다음날로 넘어감 -> end에 하루(1440분) 더함
  if (e <= s) e += 1440;

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // 현재 시간을 확장된 선형(현재, 현재+1440)에서 체크
  if ((nowMin >= s && nowMin <= e) || (nowMin + 1440 >= s && nowMin + 1440 <= e)) {
    return true;
  }

  return false;
}  


const PharmacyFind = () => {
    const navigate = useNavigate();

    const [subType, setSubType] = useState('listView');
    const [open, setOpen] = useState(false);
    const [locationText, setLocationText] = useState('위치 확인중...');
    const [currentPosition, setCurrentPosition] = useState(null);
    const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    // 마커 클릭 핸들러
    const handleMarkerClick = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setOpen(true);
    };

    const handleListClick = (pharmacy) => {
        setSelectedPharmacy(pharmacy);
        setOpen(true);
    };

    /* global naver */


    useEffect(() => {
        const waitForNaver = () => {
            if (
                window.naver &&
                window.naver.maps &&
                window.naver.maps.Service
            ) {
                getAddress();
            } else {
                setTimeout(waitForNaver, 200); // 지도 로딩 대기
            }
        };

        const getAddress = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const latitude = pos.coords.latitude;
                        const longitude = pos.coords.longitude;

                        setCurrentPosition({ lat: latitude, lng: longitude }); //현재 위치

                        const coord = new naver.maps.LatLng(
                            latitude,
                            longitude
                        );

                        naver.maps.Service.reverseGeocode(
                            { location: coord },
                            (status, response) => {
                                if (
                                    status ===
                                    window.naver.maps.Service.Status.OK
                                ) {
                                    const address =
                                        response.result.items[0]?.address ||
                                        '주소 없음';
                                    setLocationText(address);
                                } else {
                                    console.error(
                                        'reverseGeocode error',
                                        status,
                                        response
                                    );
                                    setLocationText('주소 변환 실패');
                                }
                            }
                        );
                    },
                    (err) => {
                        console.error('geolocation error', err);
                        setLocationText('위치 접근 불가');
                    }
                );
            } else {
                setLocationText('위치 서비스 미지원');
            }
        };

        waitForNaver();
    }, []);


    // 현재 위치가 세팅되면 API 호출
    useEffect(() => {
        if (!currentPosition) return;

        const fetchPharmacies = async () => {
            try {
                const url = `https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyLcinfoInqire?serviceKey=${API_KEY}&WGS84_LON=${currentPosition.lng}&WGS84_LAT=${currentPosition.lat}&numOfRows=500`;

                const response = await fetch(url);
                const text = await response.text(); // 공공데이터포털은 XML 응답이 기본
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, 'application/xml');

                const items = Array.from(xml.getElementsByTagName('item')).map((el, idx) => {
                     const startRaw = el.getElementsByTagName('startTime')[0]?.textContent || '';
                    const endRaw = el.getElementsByTagName('endTime')[0]?.textContent || '';
                    const hours = startRaw || endRaw ? `${formatTime(startRaw)} ~ ${formatTime(endRaw)}` : '영업시간 정보 없음';
                    const openNow = isNowBetween(startRaw, endRaw);

                    return {
                        id: idx,
                        name: el.getElementsByTagName('dutyName')[0]?.textContent || '이름 없음',
                        phone: el.getElementsByTagName('dutyTel1')[0]?.textContent || '전화번호 없음',
                        address: el.getElementsByTagName('dutyAddr')[0]?.textContent || '주소 없음',
                        startRaw,
                        endRaw,
                        hours,
                        isOpen: openNow,
                        lat: parseFloat(el.getElementsByTagName('wgs84Lat')[0]?.textContent || 0),
                        lng: parseFloat(el.getElementsByTagName('wgs84Lon')[0]?.textContent || 0),
                    };
                });

                setNearbyPharmacies(items);
            } catch (error) {
                console.error('API 호출 오류:', error);
            }
        };

        fetchPharmacies();
    }, [currentPosition]);

    

    // 현재 영업 중인지 확인 함수
    const isOpenNow = (start, end) => {
        if (!start || !end) return false;

        const now = new Date();
        const currentTime = now.getHours() * 100 + now.getMinutes(); // HHmm 정수형
        const startNum = parseInt(start, 10);
        const endNum = parseInt(end, 10);

        // end 가 "2500" 같은 경우 → "2400" 으로 처리
        const fixedEnd = endNum > 2400 ? 2400 : endNum;

        return currentTime >= startNum && currentTime <= fixedEnd;
    };



    const onDismiss = () => {
        setOpen(false);
    };

    return (
        <>
            <HeadSub title="근처 약국 찾기" iconClose />

            {/* 처방전이 없을때 */}
            {/* <div id="sub-content" data-layout="white">     
                <div className='inner-wrap'>
                   <div className={style['mid-box']} data-page='no-data'>
                        <div className='animation-2'>
                            <div className={style['mid']}>
                                <object data={iconLocation}/>
                            </div>
                            <div className={style['botm']}>
                                <strong>위치 데이터 접근을 허용해주세요.</strong>
                                <span>위치 데이터 접근 허용 시에만 <br />
                                        약국 찾기 서비스 이용이 가능합니다.
                                </span>
                                <button className='btn m-t-12' data-btn-type="fill-main" data-btn-size='smd' data-btn-icon='arrow'>
                                 <span>설정 바로가기</span>
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* 처방전이 확인 되었을때 */}
            <div id="sub-content" data-top-margin="0">
                <div
                    className="inner-wrap"
                    data-padding="0"
                    data-flex-dir="column"
                >
                    <div className={style['top-cont-box']}>
                        <div className={style['cuurent-posi']}>
                            <span>{locationText}</span>
                        </div>
                        <Box
                            sx={{ display: 'flex' }}
                            className={style['swich-btn-btn']}
                        >
                            <Box className="mask-box">
                                <Box
                                    className="mask"
                                    style={{
                                        transform: `translateX(${
                                            subType === 'listView' ? 0 : '86px'
                                        })`,
                                    }}
                                />
                                <Button
                                    disableRipple
                                    variant="text"
                                    sx={{
                                        color:
                                            subType === 'listView'
                                                ? '#ffffff'
                                                : '#A2A6AC',
                                    }}
                                    onClick={() => setSubType('listView')}
                                    className={
                                        subType === 'listView'
                                            ? `${style.active}`
                                            : null
                                    }
                                >
                                    목록 보기
                                </Button>
                                <Button
                                    disableRipple
                                    variant="text"
                                    sx={{
                                        color:
                                            subType === 'mapView'
                                                ? '#ffffff'
                                                : '#A2A6AC',
                                    }}
                                    onClick={() => setSubType('mapView')}
                                    className={
                                        subType === 'mapView'
                                            ? `${style.active}`
                                            : null
                                    }
                                >
                                    지도 보기
                                </Button>
                            </Box>
                        </Box>

                        <div className={style['noti-chkbox']}>
                            <p className={style['hit']}>꼭 확인해주세요!</p>
                            <span>
                                약국마다 취급하는 약이 달라 처방 받은 약이 없을
                                수 있어요. <br />
                                반드시 약국에 미리 연락해 조제 가능 여부를
                                확인해보세요.
                            </span>
                        </div>
                    </div>

                    <div className={style['bot-cont-box']}>

                        {subType === 'mapView' && currentPosition ? (
                            <div className={style['list-map-box']}>
                              <PharmacyMap
                                onMarkerClick={handleMarkerClick}
                                selectedPharmacy={selectedPharmacy}
                                currentPosition={currentPosition}
                                pharmacies={nearbyPharmacies} // 지도에 넘김

                              />
                            </div>
                          ) : subType === 'mapView' ? (
                            <div className={style['list-map-box']}>
                              <div className={style['map-loading']}>
                                  <object data={iconLocation}/>
                                  <p>위치 정보를 불러오는 중입니다...</p>
                              </div>
                            </div>
                          ) : (
                            <div className={style['list-view-box']}>
                                <ul>
                                    {nearbyPharmacies.map((item) => (
                                        <li key={item.id} onClick={() => handleListClick(item)}>
                                        <span data-state={item.isOpen ? "1" : "2"}></span>
                                        <strong>{item.name}</strong>
                                        <span className={style['phon']}>{item.phone}</span>
                                        <span className={style['address']}>{item.address}</span>
                                        <span className={style['hours']}>{item.hours}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                          )}              

                    </div>
                </div>
            </div>

            <BottomSheet
                scrollLocking={false} // 내부 스크롤을 위해 BottomSheet 스크롤 잠금 해제
                expandOnContentDrag={false} // 내용 드래그로 확장 방지
                open={open}
                onDismiss={onDismiss}
                snapPoints={({ minHeight }) => minHeight}
                blocking={true}
            >
                {selectedPharmacy && (
                    <PharmacyDetailsBox
                        pharmacy={selectedPharmacy}
                        onClose={() => setOpen(false)}
                    />
                )}
            </BottomSheet>
        </>
    );
};

export default PharmacyFind;
