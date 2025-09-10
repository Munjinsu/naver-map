import React from 'react';
import styled, {keyframes} from 'styled-components';
import imgCalrender from '../../../src/images/user/i_calrender.svg';
import bannerImg_01 from '../../../src/images/user/i_3d_banner_item_01_01.svg';
import bannerImg_02 from '../../../src/images/user/i_3d_banner_item_02_01.svg';
import bannerImg_03 from '../../../src/images/user/i_3d_banner_item_03_01.svg';
import arrowImg from '../../../src/images/common/i_arrow_sm_right.svg';
import { Link } from 'react-router-dom';
import URL from '../../constants/url';


const BannerBox = styled.div`
    margin-top: var(--sp-10);
`;

const InnerBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    line-height: 1.4;
    & > p {
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray-5);
    }
    & > strong {
        font-size: var(--mo-fz-lg);
        color: var(--color-main-gray);
        font-weight: var(--fz-weight-700);
    }
    & > span {
        padding-bottom: var(--sp-04);
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray-10);
        font-weight: var(--fz-weight-700);
    }
    & > .all-date-btn {
        display: flex;
        align-items: center; 
        gap: var(--sp-04);
        margin-top: var(--sp-08);
        font-size: var(--mo-fz-smd); 
        color: var(--color-main-gray-5);
        &::after {
            content: ""; 
            display: block; 
            width: 1.2rem; 
            height: 1.2rem; 
            background-size: contain; 
        }
    }

`;

const float = keyframes`
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }   
`;
const ImgBox = styled.div`
    display: block;
    width: 11.2rem;
    height: 11.2rem;
    animation: ${float} 3s ease-in-out infinite;
    transition: transform 0.3s;
`;


const ImgItem = styled.object`
    &.bannerImg_02 {
        padding-right: var(--sp-10);
    }
`;

// 날짜 포맷 함수
const getTodayString = () => {
    const today = new Date();
    const options = { month: 'numeric', day: 'numeric', weekday: 'long' };
    const dateStr = today.toLocaleDateString('ko-KR', options);
    const [month, day, weekday] = dateStr.replace(/\s/g, '').split('.');

    return `${month.replace('월','')}월 ${day.replace('일','')}일 ${weekday}`;
};

const TopBannerBox = ({ type }) => {
    return (
        <BannerBox>
            <InnerBox>
                <TextBox>
                    {type === 'typeA' && (
                        <>  
                            <span>{getTodayString()}</span>
                            <strong>오늘 해야 할 기록을 <br />확인해주세요!</strong>
                            <Link to={URL.CALENDER} className='all-date-btn'>
                            <img src={imgCalrender} alt="" /> 전체일정
                            <img src={arrowImg} alt="" /> 
                            </Link>
                        </> 
                    )}
                    {type === 'typeB' && (
                        <>
                            <strong>집에서도 안전한 치료, <br />
                                    맞춤 가이드로 <br /> 
                                    함께하세요!
                            </strong>
                        </>
                    )}
                    {type === 'typeC' && (
                        <>
                            <strong>나를 위한 건강 정보, <br />
                                    쉽고 빠르게 <br />
                                    한눈에 확인하세요!
                            </strong>
                        </>
                    )}
                </TextBox>
                <ImgBox>
                    {type === 'typeA' && <ImgItem data={bannerImg_01} />}
                    {type === 'typeB' && (
                        <ImgItem data={bannerImg_02} className="bannerImg_02" />
                    )}
                    {type === 'typeC' && <ImgItem data={bannerImg_03} />}
                </ImgBox>
            </InnerBox>
        </BannerBox>
    );
};

export default TopBannerBox;
