import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '../../images/common/i_delete.svg';


// 체질량 컴퍼넌트

const ContentWrap = styled.div`
    display: block;
    border-radius: var(--radius-16);
    background-color: var(--color-white);
`;

const InnerBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--sp-08);
    padding: var(--sp-16);
`;
const TopBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    & .status {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 20px;
        padding: 0 10px;
        border-radius: 100px;
        background-color: #D6E6FF;
        font-size: 12px;
        color: #3284FF;
        font-weight: 700;
    }
    & .status[data-status="normal"] {
        background-color: #D6E6FF;
        color: #3284FF;
    }
    & .status[data-status="underweight"] {
        background-color: #ECDBFA;
        color: #9E4AE6;
    }    
    & .status[data-status="caution"] {
        background-color: #FFE8D4;
        color: #FF8D29;
    }
    & .status[data-status="danger"] {
        background-color: #FADCDC;
        color: #E55151;
    }
    & .delt-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width:24px;
        height: 24px;
        border-radius: 8px;
        background-color: #D6E6FF;
        transform: scale(1);
        transition: transform .4s;
    }
    & .delt-btn:active {
        transform: scale(.9);
    }
`;
const MiddleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
    & ul {
        display: flex;
        gap: var(--sp-32);
    }

    & ul > li {
        display: flex;
        flex-direction: column; 
        
        & > strong {
            font-size: var(--mo-fz-sm);
            color: var(--color-main-gray-5);
            font-weight: 700;
        } 
        & > p {
            font-size: var(--mo-fz-sm);
            color: var(--color-main-gray-10);
            font-weight: 400;    
            & span {
                padding-right: var(--sp-04);
                font-size: var(--mo-fz-smd);
                color: var(--color-main-gray);
                font-weight: 700;
            }
        }
    }
    & ul > li ~ li {
        margin-top: 0;
    }
    
    
`;
const BottomBox = styled.div`
    & span {
        font-size: var(--mo-fz-sm);
        color: var(--color-main-gray-10);
        font-weight: 400; 
    }
`;



const  BodyMassRecordBox = ({stature, weight, bmi, date, time, onDelete}) => {

    /* 
    저체중: 18.5 미만
    위험: 25 이상
    주의: 23 이상 25 미만
    정상: 18.5 이상 23 미만
    */

    let status = '1'; // 기본값 정상
    const bmiValue = parseFloat(bmi);

    if (bmiValue < 18.5) {
        status = '4';
    } else if (bmiValue >= 25) {
        status = '3';
    } else if (bmiValue >= 23) {
        status = '2';
    } else {
        status = '1';
    }

    
    return (
        <ContentWrap>
            <InnerBox>
                <TopBox>

                {status === '1' && <span className='status' data-status="normal">정상</span>}
                {status === '2' && <span className='status' data-status="caution">주의</span>}
                {status === '3' && <span className='status' data-status="danger">위험</span>}    
                {status === '4' && <span className='status' data-status="underweight">저체중</span>}
                
                    <button className='delt-btn' onClick={onDelete}>
                        <img src={DeleteIcon} alt="삭제" />
                    </button>
                </TopBox>    
                <MiddleBox>
                        <div className='mid-box'>
                            <ul>
                                <li>
                                    <strong>키</strong>
                                    <p>
                                        <span>{stature}</span>cm
                                    </p>
                                </li>
                                <li>
                                    <strong>체중</strong>
                                    <p>
                                        <span>{weight}</span>kg
                                    </p>
                                </li>
                                <li>
                                    <strong>체질량 지수(BMI)</strong>
                                    <p>
                                        <span>{bmi}</span>
                                    </p>
                                </li>
                            </ul>
                            
                        </div>
                        
                </MiddleBox>    
                <BottomBox>
                        <span>{date} {time} </span>
                </BottomBox>   
            </InnerBox>
        </ContentWrap>
    );
};

export default BodyMassRecordBox;