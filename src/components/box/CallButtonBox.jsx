import React from 'react';
import styled from 'styled-components';
import imgMainCall from '../../images/user/i_main_call.svg';
import imgSubCall from '../../images/user/i_call.svg';
import { handlePhoneCall } from '../../constants/webViewBridge';



// 주차안내 > 주차 문의 버튼

const InnerBox = styled.div`
    display: block; 
    width: 100%;
    margin-bottom: var(--sp-30)
`;

const Button = styled.button`
    display: flex; 
    flex-direction: column; 
    align-items: center;
    justify-content: center; 
    width:100%;
    height: var(--sp-72);
    border-radius: var(--radius-20);
    background-color: var(--color-main-5);
`;

const TitleBox = styled.p`
    font-size: var(--mo-fz-smd);
    color: var(--color-white);
    font-weight: var(--fz-weight-700);
`;

const PhoneNumBox = styled.p`
    font-size: var(--mo-fz-xlg);
    color: var(--color-white);
    font-weight: var(--fz-weight-700);
`;


// 타입 B (병원 정보 > 주요 전화번호 안내 )
const TopBox = styled.div`
    display: block;
    border-bottom: var(--sp-08) solid var(--color-main-gray-45);  
`;

const TopBoxBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: var(--sp-28) var(--sp-32);
    background-color: transparent;
`;

const TopBoxTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & p {
        font-size: var(--mo-fz-md);
        color: var(--color-main-gray-5);
        font-weight: var(--fz-weight-700);
    }
    & strong {
        font-size: var(--sp-24);
        color: var(--color-main-5);
        font-weight: var(--fz-weight-700);
    }
`; 

const PhoneIconBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp-60);
    height: var(--sp-60);
    border-radius: var(--radius-full);
    box-shadow: 4px 4px 12px 0px rgba(50, 132, 255, 0.2);
    & img {
        display: block;
        width:100%;
        height: 100%;
    }
`;


const ButtonBox = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp-24);
    height: var(--sp-24);
    border-radius: var(--radius-full);
    background-color: var(--color-main-15);
    background-image: url(${imgSubCall});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 1.8rem;
`;


const CallButtonBox = ({type, hospital, phoneNumber}) => {


    const handleCall = () => {
         //앞 번호만 가져오기
        const firstNumber = phoneNumber.split(',')[0].trim();
        // window.location.href = `tel:${firstNumber}`;

        handlePhoneCall(firstNumber);
    };    

    return (
        <>
            {type == "b" ? (
                <TopBox>
                    <TopBoxBtn onClick={handleCall}>
                        <TopBoxTitle>
                            <p>{hospital} 대표 전화 </p>
                            <strong>{phoneNumber}</strong>
                        </TopBoxTitle>    
                        <PhoneIconBox>
                            <img src={imgMainCall} alt="" />
                        </PhoneIconBox>
                    </TopBoxBtn>
                </TopBox>    
            ) : 
            type == "c" ? (
                <ButtonBox onClick={handleCall}></ButtonBox>
            ) :
            (
                <InnerBox>
                    <Button onClick={handleCall}>
                        <TitleBox>{hospital} 주차 문의</TitleBox>    
                        <PhoneNumBox>{phoneNumber}</PhoneNumBox>
                    </Button>
                </InnerBox>
            )

            }
        </>
        
    );
};

export default CallButtonBox;