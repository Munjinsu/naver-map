import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../../constants/url';

// 게시판 카드 박스 컴퍼넌트 

const CardContent = styled.div`
    display: block;
    margin-top: var(--sp-10);
`;

const InnerBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--sp-02);
    padding: var(--sp-16);
    border-radius: var(--radius-16);
    background-color: var(--color-white);
`;

const ImgBox = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 0;
    margin-bottom: var(--sp-06);
    padding-bottom: 56.25%;
    border-radius: var(--radius-8);
    & img {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const CardTypeTit = styled.p`
    display: flex;
    align-items: center;
    gap: var(--sp-04);
    font-size: var(--mo-fz-sm);
    color: var(--color-main-gray-10);
    font-weight: var(--fz-weight-700);
    & .new {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--sp-16);
        height: var(--sp-16);
        border-radius: var(--radius-full);
        background-color: var(--color-main-5);
        font-size: 1rem;
        color: var(--color-white);
    }
`;

const CardMainTit = styled.strong`
    font-size: var(--mo-fz-smd);
    color: var(--color-main-gray);
    font-weight: var(--fz-weight-700);
`;

const CardSubTit = styled.p`
    font-size: var(--mo-fz-smd);
    color: var(--color-main-gray-5);
    font-weight: var(--fz-weight-400);
`;

const CardDate = styled.p`
    display: flex;
    align-items: center;
    
    & span {
        display: flex;
        align-items: center;
        font-size: var(--mo-fz-sm);
        color: var(--color-main-gray-10);
        font-weight: var(--fz-weight-400);
        &:last-child:before {
            content:"";
            display: block;
            width:1px; 
            height: 10px;
            margin: var(--sp-04) var(--sp-04);
            background-color: var(--color-main-gray-60);
        }
    }

`;

const BoardCardBox = ({ type, news, title, date, hospital}) => {

    const navigate = useNavigate();
    

    return (
        <CardContent>
            <InnerBox>
                 

                {type === "movie" ? (
                    <div onClick={()=> navigate(URL.NOTICE_BOARD_MOVIE_DETAIL)}>
                        <ImgBox>
                        <img src='https://img.youtube.com/vi/o9csAaEl5fI/mqdefault.jpg' />
                        {/* 
                        썸네일 가지고 오는 법    
                        https://img.youtube.com/vi/ 고유 아이디 /mqdefault.jpg 
                        */}
                        </ImgBox>
                        <CardTypeTit>동영상 {news ? <span className='new'>N</span> : null}</CardTypeTit>
                        <CardMainTit>{title}</CardMainTit>
                        <CardDate> <span>{hospital}</span> <span>{date}</span></CardDate>       
                    </div>
                ) : type === "card" ? (
                    <div onClick={()=> navigate(URL.NOTICE_BOARD_CARD_DETAIL)}>
                        <CardTypeTit>카드뉴스 {news ? <span className='new'>N</span> : null}</CardTypeTit>
                        <CardMainTit>{title}</CardMainTit>
                        <CardDate> <span>{hospital}</span> <span>{date}</span></CardDate>       
                    </div>
                ) : type === "slide" ? (
                    <div onClick={()=> navigate(URL.NOTICE_BOARD_SLIDE_DETAIL)}>
                        <CardTypeTit>슬라이드 {news ? <span className='new'>N</span> : null}</CardTypeTit>
                        <CardMainTit>{title}</CardMainTit>
                        <CardDate> <span>{hospital}</span> <span>{date}</span></CardDate>       
                    </div>   
                ) : null} 
                
            </InnerBox>
        </CardContent>
    );
};

export default BoardCardBox;
