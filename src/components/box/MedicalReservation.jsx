import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";
import imgCloseBtn from '../../images/common/i_close_btn.svg';
import hosApptInfo from '../../assets/json/hosApptInfo.json';
import { handlePhoneCall } from '../../constants/webViewBridge';



// 병원케어 > 진료예약약


const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 3.8rem 1.6rem 1.6rem; 
    & > strong {
        display: block;
        width: 100%;
        font-size: var(--mo-fz-lg); 
        color: var(--color-main-gray); 
    }
    & > span {
    display: block;
    width: 100%;
    margin-top: var(--sp-12);
    text-align: center;
    font-size: var(--mo-fz-smd); 
    color: var(--color-main-gray); 
    }
    &  .close-btn {
        position: absolute; 
        top: var(--sp-16); 
        right: var(--sp-16);
        width: var(--sp-24); 
        height: var(--sp-24);
        background: url(${imgCloseBtn}) no-repeat center;
        background-size: 100%;
    }
`;

const ContentBox = styled.div`
    display: block;
    width: 100%;
    margin-top: var(--sp-24);
`;

const ListBox = styled.ul`
    display: flex;
    flex-direction: column;
    gap: var(--sp-12);
`;

const List = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    & a {
        display: flex;
        align-items: center; 
        justify-content: center; 
        position: relative;
        width: 100%;
        height: var(--sp-62);
        border-radius: var(--radius-12);
        background-color: var(--color-main-gray-45);
        text-align: center;
        & b {
            color: var(--color-main-5)
        }    
    }
    & .hit-txt-box {
        display: inline-flex;
        align-items: center; 
        justify-content: center; 
        height: var(--sp-18);
        position: absolute;
        bottom: calc(100% - 0.9rem);
        left: var(--sp-16);
        padding: 0 var(--sp-08);
        border-radius: var(--radius-100);
        background-color:#D83B3B;
        font-size: 1.1rem;
        color: var(--color-white);
        font-weight: var(--fz-weight-700);
    }
`;

const BottomBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    width: 100%;
    margin-top:var(--sp-16);
    & p {
        font-size: var(--mo-fz-smd);
        color: var(--ccolor-main-gray);
        
    }
`;

const MedicalReservation = ({onClose, hsptlCd, hsptlNm}) => {

    const hospital = hosApptInfo.find(h => h.code === hsptlCd);

    // 모바일 앱 링크 선택 (안드로이드 vs iOS)
    const getMobileAppLink = () => {
        if (!hospital) return "/#";
        const ua = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(ua)) {
            return hospital.app.android; // 안드로이드
        }
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
            return hospital.app.ios; // iOS
        }
        return hospital.app.android;
    };

    const handleCall = ()=> {
        //window.location.href = `tel:${hospital.call}`
        handlePhoneCall(hospital.call);
    }

    
    return (
        <ContentWrap>
            <InnerBox>
                <strong>
                    진료 예약
                </strong>
                <span> {hsptlNm} 병원 진료 예약은 아래 서비스에서 가능합니다. </span>
                <ContentBox>
                    <ListBox>
                        <List>
                            <Link to={hospital.kakao} target="_blank" rel="noopener noreferrer">
                                <p>{hsptlNm} 병원 <b>카카오톡 케어챗</b> 바로가기</p>
                                <span className='hit-txt-box'>쉽고 빠른 예약</span>
                            </Link>
                        </List>
                        <List>
                            <Link to={getMobileAppLink()} target="_blank" rel="noopener noreferrer">
                                <p>{hsptlNm} 병원 <b>모바일 앱</b> 바로가기</p>
                            </Link>
                        </List>
                        <List>
                            <Link to={hospital.mobile} target="_blank" rel="noopener noreferrer">
                                <p>{hsptlNm} 병원 <b>모바일 홈페이지</b> 바로가기</p>
                            </Link>
                        </List>
                    </ListBox>

                </ContentBox>

                <BottomBox>
                    <p>진료 예약 관련 궁금하신 점이 있으시면</p>
                    <p><b onClick={handleCall}>{hospital.call}</b> 으로 문의 바랍니다.</p>     
                                
                </BottomBox>

                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default MedicalReservation;