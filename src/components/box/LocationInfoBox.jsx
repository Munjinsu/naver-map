import React from 'react';
import styled, { keyframes }from 'styled-components';
import URL from '../../constants/url';
import imgClose from '../../images/common/i_close_btn.svg';
import imgLocation from '../../images/common/i_location.svg';
import {useNavigate } from 'react-router-dom';

const ContentWrap = styled.div`
    display: block;
    width: 100%;
`;

const InnerBox = styled.div`
    display: flex; 
    width: 100%;
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 1.6rem 1.6rem; 
    & > strong {
        display: block;
        width: 100%;
        padding-bottom: 1rem;
        font-size: var(--mo-fz-lg); 
        color: var(--color-main-black); 
    }
    &  .close-btn {
        position: absolute; 
        top: var(--sp-16); 
        right: var(--sp-16);
        width: var(--sp-24); 
        height: var(--sp-24);
        background: url(${imgClose}) no-repeat center;
        background-size: 100%;
    }
`;

const ContentBox = styled.div`
    display: block;
    width: 100%;
`;

const spin = keyframes`
  from {
        transform: perspective(800px) rotateY(0deg);
    }
    to {
        transform: perspective(800px) rotateY(360deg);
    }
`

const TopBox = styled.div`
    display: flex;
    justify-content: space-between;
    & p {
        display: flex; 
        align-items: center; 
        gap: var(--sp-04);
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray);
        &:before {
            content:"";
            display: flex; 
            align-items: center; 
            justify-content: center;
            width: var(--sp-24);
            height: var(--sp-24);
            background: url(${imgLocation}) no-repeat center;
            animation: ${spin} 5s infinite linear;
            transform-style: preserve-3d;
            
        }
    }
`;


const ImgBox = styled.div`
    display: flex;
    
    margin-top: 1rem;
    & img {
        display: block;
        width:100%;
    }
`;

const BotBox = styled.span`
    font-size: var(--mo-fz-sm);
    color: var(--color-main-gray);
`;


const LocationInfoBox = ({deptNm, location, imageUrl, onClose, onViewFullImage }) => { 

    
    const handleViewClick = () => {
        if (onViewFullImage && imageUrl) {
        onViewFullImage(imageUrl); // 부모에 알려줌
        }
    };

    return (
         <ContentWrap>
            <InnerBox>
                <strong>위치보기</strong>

                <ContentBox>
                <TopBox>
                    <p>{location} {deptNm}</p>
                    {imageUrl && (
                    <button 
                        className="btn" 
                        data-btn-size="sm" 
                        data-btn-type="fill-main-sub" 
                        onClick={handleViewClick}>
                        <span>크게보기</span>
                    </button>
                    )}
                </TopBox>

                <ImgBox>
                    {imageUrl ? (
                    <img src={imageUrl} alt="위치 이미지" />
                    ) : (
                    <p style={{ color: '#999', fontSize: '14px' }}>해당 홈페이지를 참고 하세요.</p>
                    )}
                </ImgBox>

                <BotBox>
                    ※ 해당 위치는 참고용으로 진료 스케줄에 따라 변경 될 수 있습니다.
                </BotBox>
                </ContentBox>

                <button className="close-btn" onClick={onClose}>
                <span className="blind">팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default LocationInfoBox;