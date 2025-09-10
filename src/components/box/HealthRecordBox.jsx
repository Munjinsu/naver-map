import React from 'react';
import styled from 'styled-components';
import i_modify from '../../../src/images/common/i_modify_on.svg';
import URL from '../../constants/url';
import { Link, useNavigate } from 'react-router-dom';
import alram_on from '../../../src/images/common/i_alram_on.svg';
import alram_off from '../../../src/images/common/i_alram_off.svg';

//감정 일지 컨퍼넌트

const RecordContent = styled.div`
    display: block;
    margin-top: var(--sp-12);
`;

const InnerBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: var(--sp-16);
    border-radius: var(--radius-16);
    background-color: var(--color-white);
`;

const InfomBox = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    gap: var(--sp-04);
    flex-grow: 1;
    position: relative;
    z-index: 1;
`;

const TopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-08);
`;

const MealChip = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--sp-20);
    padding: 0 var(--sp-10);
    border-radius: var(--radius-12);
    background-color: var(--color-main-25);
    font-size: var(--mo-fz-sm);
    color: var(--color-main-5);
    font-weight: var(--fz-weight-700);
`;

const MidBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const TypoTit = styled.div`
    & p {
    font-size: var(--mo-fz-smd);
    color: var(--color-main-gray);
    font-weight: var(--fz-weight-700);
    }
    & p.complete {
        color: var(--color-main-5);
    }
`;

const TypoSub = styled.p`
    font-size: var(--mo-fz-sm);
    color: var(--color-main-gray);
    font-weight: var(--fz-weight-400);
    white-space: nowrap;
`;

const TypoDetail = styled.p`
    display: flex;

    & > span {
        display: flex;
        align-items: center;
        padding: 0 var(--sp-08);
        font-size: var(--mo-fz-sm);
        color: var(--color-main-gray-5);
    }
    & > span:first-child {
        padding: 0;
    }
    & > span:first-child:after {
        content: '';
        display: block;
        width: 1px;
        height: 9px;
        margin-left: var(--sp-08);
        background-color: var(--color-main-gray-5);
    }
`;

const ControlBox = styled.div`
    display: flex;
    align-items: center;
    gap: var(--sp-10);
    & .alarm-status-box {
        & span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--sp-20);
            height: var(--sp-20);
            background-image: url(${alram_off});
        }& span[data-alarm="on"] {
            background-image: url(${alram_on});
        }   
    }
`;


const ControlTake = styled.div`
    position: relative;
    z-index:2;
    & > button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--sp-02);
        height: var(--sp-24);
        padding: 0 var(--sp-08) 0 var(--sp-06);
        background-color: transparent;
        font-size: var(--mo-fz-sm);
        color: var(--color-main-5);
        font-weight: var(--fz-weight-700);
        transform: scale(1);
        transition: transform 0.4s;
    }
    & > button:active {
        transform: scale(0.9);
    }
`;

const Layout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HealthRecordBox = ({title, alarmChk, write, usrSrveyRsltId, date}) => {

    const navigate = useNavigate();
    const formatted = `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
    const isPast = new Date() >= new Date(formatted);
    return (
        <RecordContent>
            <InnerBox>
                <InfomBox onClick={()=> navigate(URL.HEALTH_DETAIL, {state: {surveyType : "health"}})}>

                    {write ? (
                        <>
                          <Layout>
                            <MidBox>
                                <TypoTit>
                                    <p className='complete'>{title} 작성 완료!</p>
                                </TypoTit>
                            </MidBox>
                            <ControlBox>
                                <ControlTake>
                                    <button onClick={(e)=> {e.stopPropagation();  navigate(URL.HEALTH_WRITE_LIST, {state: {usrSrveyRsltId : usrSrveyRsltId, date: date}})}}><img src={i_modify}></img> 수정</button>
                                </ControlTake>
                            </ControlBox>
                          </Layout>  
                        </>
                    ) : (
                     <>
                        <TopBox>
                        <MealChip>약 5분 소요</MealChip>
                        <ControlBox>
                            <div className="alarm-status-box">
                                <span data-alarm={alarmChk ? "on" : null}></span>
                            </div>
                            
                            {isPast && <ControlTake>
                                <button onClick={(e)=> {
                                    e.stopPropagation(); 
                                    navigate(URL.HEALTH_ADD, {state: {date : date}});
                                }}> 작성하기</button>
                             
                            </ControlTake>}
                        </ControlBox>
                        </TopBox>
                        <MidBox>
                            <TypoTit>
                                <p>{title}</p>
                            </TypoTit>
                            <TypoSub>
                            오늘 하루는 어땠는지 알려주세요
                            </TypoSub>
                            <TypoDetail>
                                <span>여의도성모</span>
                                <span>혈액내과 처방</span>
                            </TypoDetail>
                        </MidBox>
                     </>   
                    )
                        
                    }

                    
                </InfomBox>

                
            </InnerBox>
        </RecordContent>
    );
};

export default HealthRecordBox;
