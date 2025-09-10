import React, { Children } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import arrowRight from '../../../src/images/common/i_arrow_sm_right.svg';
import BoardCardBox from './BoardCardBox';


// 홈케어 > 맟춤 질환 정보 > 기본정보/건강정보 컴퍼넌트

const InfomationBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--sp-28);
    margin-top: var(--sp-12);
`;

const DefaultInfom = styled.div`
    & > strong {
        font-size: var(--mo-fz-md);
        color: var(--color-main-gray);
        font-weight: var(--fz-weight-700);
    }
`;

const TermBox = styled.div`
    margin-top: var(--sp-12);
    padding: var(--sp-16);
    border-radius: var(--radius-16);
    background-color: var(--color-white);
`;

const TermHead = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sp-06);

    & > div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0 var(--sp-06);
    }
    & > div > p {
        font-size: var(--mo-fz-lg);
        color: var(--color-main-5);
        font-weight: var(--fz-weight-700);
    }
    & > div > span {
        font-size: var(--mo-fz-md);
        color: var(--color-main-5);
        font-weight: var(--fz-weight-400);
    }
    & > .more-btn {
        display: flex;
        align-items: center;
        gap: var(--sp-06);
        flex-shrink: 0;
        background-color: transparent;
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray-5);
        font-weight: var(--fz-weight-400);
        
    }
`;

const TermBody = styled.div`
    margin-top: var(--sp-04);
    font-size: var(--mo-fz-smd);
    color: var(--color-main-gray);
    line-height: 1.6;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;

    img { max-width: 100%; height: auto; display: block; }
`;

const HealthInform = styled.div`
    margin-top: 0;
    & > strong {
        display: block;
        margin-bottom: var(--sp-12);
        font-size: var(--mo-fz-md);
        color: var(--color-main-gray);
        font-weight: var(--fz-weight-700);
    }
    & .tab-lists button:first-child {
        margin-left: 0 !important;
    }
`;

const NoDataBox = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    height: var(--sp-52); 
    margin-top: var(--sp-12);
    border: 2px dashed var(--color-main-gray-50); 
    border-radius: var(--radius-20); 
    background-color: transparent;

    & > p {
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray-10);
    }
`;




const Division = styled.div``;


const DiseaseInformation = ({ data }) => {
    
    const [value, setValue] = React.useState('1');
    const [showFull, setShowFull] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const formatImageSrcSafe = (html) => {
        if (!html) return '';
        // 이미지 src 경로 변경
        let formatted = html.replace(/src="\/api/g, 'src="https://www.cmcseoul.or.kr/api');
        
        // <img> 태그에 onError 속성 추가: 에러 시 display:none 처리
        formatted = formatted.replace(/<img /g, '<img onError="this.style.display=\'none\'" ');
        return formatted;
    };

    return (
        <InfomationBox>
            <DefaultInfom>
                <strong>기본정보</strong>

                {/* <NoDataBox>
                    <p>질환 정보가 없습니다</p>
                </NoDataBox> */}

                <TermBox>
                    <TermHead>
                        <div>
                            <p>{data?.dissNm}</p>
                            <span>{data?.hblEngNm}</span>
                        </div>
                        {!showFull && (
                            <button className="more-btn" onClick={() => setShowFull(true)}>
                                더보기
                                <img src={arrowRight} alt="내용 더보기" />
                            </button>
                        )}
                    </TermHead>
                    <TermBody
                        style={showFull ? { overflow: 'visible', display: 'block', WebkitLineClamp: 'unset' } : {}}
                        //dangerouslySetInnerHTML={{ __html: data?.hblDtlCn }}
                        dangerouslySetInnerHTML={{ __html: formatImageSrcSafe(data?.hblDtlCn) }}
                    />
                </TermBox>
            </DefaultInfom>

            <HealthInform>
                <strong>건강 정보</strong>
                <Division>
                    <TabContext value={value}>
                        <div className="top-tab-head" data-type="b">
                            <TabList
                                onChange={handleChange}
                                aria-label="lab API tabs example"
                                variant="scrollable"
                                scrollButtons={false}
                                className='tab-lists'
                            >
                                <Tab label="전체" value="1" disableRipple />
                                <Tab label="카드뉴스" value="2" disableRipple />
                                <Tab label="슬라이드" value="3" disableRipple />
                                <Tab label="동영상" value="4" disableRipple />
                            </TabList>
                        </div>

                        {/* <NoDataBox>
                            <p>건강 정보가 없습니다</p>
                        </NoDataBox> */}

                        <TabPanel value="1">
                            <BoardCardBox type="card" news="on" title="눈 깜짝할 사이 실명을 부르는 당뇨병성 망막병증" date="24.12.25" hospital="여의도성모"/>
                            <BoardCardBox type="slide" title="눈 깜짝할 사이 실명을 부르는 당뇨병성 망막병증" date="24.12.25" hospital="여의도성모"/>
                            <BoardCardBox type="movie" news="on" title="연간 2,000명이 발을 절단한다?" date="24.12.25" hospital="서울성모"/>
                        </TabPanel>
                        <TabPanel value="2"></TabPanel>
                        <TabPanel value="3"></TabPanel>
                        <TabPanel value="4"></TabPanel>
                    </TabContext>
                </Division>
            </HealthInform>
        </InfomationBox>
    );
};

export default DiseaseInformation;
