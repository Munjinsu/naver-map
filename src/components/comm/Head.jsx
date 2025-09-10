import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import URL from '../../constants/url';

import BarCode from './BarCode';

import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import HomeCare from '../../pages/user/homecare/HomeCareMain';

const Header = ( {menu} ) => {
    
    const [open, setOpen] = useState(false);
    
    useEffect(() => {
        setOpen(false);
    }, []);

    function onDismiss() {
        setOpen(false);
    }

    let navigate = useNavigate();

    return (
        <>
            <div className="header">

            {
                 (() => {
                    switch (menu) {
                        case "homecare":
                            return (
                                <h1 className="total-title">
                                    홈케어
                                </h1>
                            );
                        case "hospitalcare":
                            return (
                                <h1 className="total-title">
                                    병원케어
                                </h1>
                            );
                        case "alarm":
                            return (
                                <h1 className="total-title">
                                    알림
                                </h1>
                            );
                        case "mypage":
                            return (
                                <h1 className="total-title">
                                    내정보
                                </h1>
                            );
                        case "totalmenu":
                            return (
                                <h1 className="total-title">
                                    전체메뉴
                                </h1>
                            );
                    }
                  })()
                }
                
                
                <div className="bar-code" onClick={() => setOpen(true)}>
                <p>진료카드</p>
                </div>
                
                

                <BottomSheet
                scrollLocking={false} // 내부 스크롤을 위해 BottomSheet 스크롤 잠금 해제
                expandOnContentDrag={false} // 내용 드래그로 확장 방지
                    open={open}
                    onDismiss={onDismiss}
                    snapPoints={({ minHeight }) => minHeight}
                    blocking={false}
                >
                    <BarCode onClose={onDismiss} />
                </BottomSheet>
            </div>

            {/* <BarCode isOpen={isOpen} onClose={closeModal} show={slide} /> */}
        </>
    );
};

export default Header;
