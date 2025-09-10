import React from 'react';
import styled from 'styled-components';
import imgMainCall from '../../images/user/i_main_call.svg';
import imgSubCall from '../../images/user/i_call.svg';
import { handlePhoneCall } from '../../constants/webViewBridge';



// 병원케어 > 근처 약국 찾기

const TopBoxBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--sp-08) var(--sp-10);
    border-radius: var(--radius-12);
    background-color: var(--color-main-5);
    transform: scale(1); 
    transition: transform 0.25s;
        &:active {
            transform: scale(0.93);
        }
`;

const TopBoxTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--sp-04);
    width: 100%;
    & p {
        font-size: var(--mo-fz-smd);
        color: var(--color-white);
        font-weight: var(--fz-weight-700);
    }
    & span {
        font-size: var(--mo-fz-sm);
        color: var(--color-white);
    }
`; 



const PharmacyCallButtonBox = ({type, phoneNumber}) => {


    const handleCall = () => {
         //앞 번호만 가져오기
        const firstNumber = phoneNumber.split(',')[0].trim();
        // window.location.href = `tel:${firstNumber}`;

        handlePhoneCall(firstNumber);
    };    

    return (
        <>
            {type === "a" && (
                <TopBoxBtn onClick={handleCall}>
                    <TopBoxTitle>
                        <p>병원에 처방전 전송 요청</p>
                        <span>%서울성모병원% 담당자 전화 연결</span>
                    </TopBoxTitle>    
                </TopBoxBtn>
               
            )}

            {type === "b" && (
                <TopBoxBtn onClick={handleCall}>
                    <TopBoxTitle>
                        <p>약국에 조제 가능 여부 확인</p>
                        <span>%디팜약국% 전화 연결 </span>
                    </TopBoxTitle>    
                </TopBoxBtn>
            ) 
            }
        </>
        
    );
};

export default PharmacyCallButtonBox;