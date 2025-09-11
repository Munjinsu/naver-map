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

const pharmacyList = [
    {
        id: 1,
        name: '디팜약국',
        phone: '02-0000-0000',
        address: '서울시 서초구 반포대로 어쩌고 저쩌고 주소 노출서울시 서초구 반포대로 어쩌고 저쩌고 주소 노출',
    },
    {
        id: 2,
        name: '온누리약국',
        phone: '02-1111-1111',
        address: '서울시 서초구 반포대로 어쩌고 저쩌고 주소 노출서울시 서초구 반포대로 어쩌고 저쩌고 주소 노출',
    },
    {
        id: 3,
        name: '메디팜약국',
        phone: '02-2222-2222',
        address: '서울시 서초구 반포대로 3',
    },
];

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
                                    {pharmacyList.map((item, index) => (
                                        <li
                                            key={item.id ? String(item.id) : `pharmacy-${index}`}
                                            onClick={() =>
                                                handleListClick(item)
                                            }
                                        >
                                            <span data-state='1'></span>
                                            <strong>{item.name}</strong>
                                            <span className={style['phon']}>{item.phone}</span>
                                            <span className={style['address']}>{item.address}</span>
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
