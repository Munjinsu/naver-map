import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '../../images/common/i_delete.svg';


// 혈당 기록 컴퍼넌트

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
    & .status[data-status="caution"] {
        content: "주의";
        background-color: #FFE8D4;
        color: #FF8D29;
    }
    & .status[data-status="danger"] {
        content: "위험";
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
    gap: 3.2rem;
    & .mid-box strong {
        font-size: var(--mo-fz-sm);
        color: var(--color-main-gray-5);
        font-weight: 700;
    }
    & .mid-box p {
        display: flex;
        align-items: center;
        gap: 3px;
        font-size: var(--mo-fz-sm);
        color: var(--color-main-gray-10);
        font-weight: 400;
    }
    & .mid-box p span {
        font-size: var(--mo-fz-smd);
        color: var(--color-main-black);
        font-weight: 700;
    }
`;
const BottomBox = styled.div`
    & span {
        font-size: var(--mo-fz-sm);
        color: var(--color-main-gray-10);
        font-weight: 400; 
    }
`;



const BloodSugarRecordBox = ({measureStatus, bloodSugar, statusValue, date, time, onDelete, status}) => {

    /*
                        	    정상	  주의	        위험
        공복 (statusValue = 1)	60~100	101~125	   126 초과 또는 59 이하
        식후 (statusValue = 2)	90~139	140~199	   200 이상 또는 89 이하
    */


    return (
        <ContentWrap>
            <InnerBox>
                <TopBox>
                
                    {
                        status === "N" ? <span className='status' data-status="normal">정상</span>
                        : status === "C" ? <span className='status' data-status="caution">주의</span>
                        : <span className='status' data-status="danger">위험</span>
                    }

                    <button className='delt-btn' onClick={onDelete}>
                        <img src={DeleteIcon} alt="삭제" />
                    </button>
                </TopBox>    
                <MiddleBox>
                        <div className='mid-box'>
                            <strong>{measureStatus}</strong>
                            <p>
                                <span>{bloodSugar}</span>mg/dL 
                            </p>
                        </div>
                </MiddleBox>    
                <BottomBox>
                        <span>{date} {time}</span>
                </BottomBox>   
            </InnerBox>
        </ContentWrap>
    );
};

export default BloodSugarRecordBox;