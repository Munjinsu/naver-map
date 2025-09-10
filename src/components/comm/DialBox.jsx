import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import URL from '../../constants/url';
import bgimg from '../../images/user/btn_chatbot_01.svg';


const Container = styled.div`
    display: flex;
    position: fixed;
    z-index:10;
    bottom: var(--sp-70);
    right: var(--sp-16);
    width: var(--sp-52);
    //height: 16rem;
`;

const FrontBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute; 
    bottom:0;
    width: var(--sp-52);
    height: var(--sp-52);
    background-image: url(${bgimg});
    background-size: contain;
    background-position: center;
    transition: transform 0.4s, opacity 0.3s;
    transform: rotateY(0deg); 
    &.hide {
        visibility:hidden;
        opacity:0;
        transform: rotateY(270deg);
    }
    
    & span {
        font-size: var(--sp-08);
        color: var(--color-white);
        font-weight: var(--fz-weight-700);
    }
    & p {
        font-size: 1.1rem;
        color: var(--color-white);
        font-weight: var(--fz-weight-700);
    }

`;
const BackBox = styled.div`
    visibility: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--sp-08);
    width:0;
    height:0;
    opacity:0;
    transition: opacity 0.5s;
    transition-delay: opacity 0.8s;
    &.show {
        visibility: visible;
        opacity: 1;
        width:100% !important;
        height:100% !important;
    }
    & .cont-box {
        width: var(--sp-52);
        height: var(--sp-52);
        transform: scale(1);
        transition: transform 0.4s;
        & button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            border-radius: var(--radius-full);
            background-color: #003F9E;
        }
        & span {
            font-size: var(--sp-10);
            color: var(--color-white);
            font-weight: var(--fz-weight-700);
        }
        & p {
            font-size: var(--sp-10);
            color: var(--color-white);
            font-weight: var(--fz-weight-700);
        }
    }
    & .cont-box:active {
        transform: scale(0.8);
    }    
    & .colse-box {
        width: var(--sp-40);
        height: var(--sp-40);
         & button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: var(--radius-full);
            background-color: var(--color-main-black);
            & span {
                display: block;
                position: absolute;    
                top:50%;
                left:50%;
                width: 1px;
                height: 1.5rem;
                background-color: var(--color-white);
                transform: translate(-50%, -50%) rotate(45deg);
                transform-origin: center; 
            }
            & span:last-child {
                transform: translate(-50%, -50%) rotate(-45deg);
                transform-origin: center;
            }
            
        }
    }    
`;

const DialBox = () => {

    const userInfo = JSON.parse(sessionStorage.getItem("loginUser"));

    const navigate = useNavigate();

    const [btnState, setBtnState] = useState("show");
    const [showState, setShowState] = useState("hide");

    return (
       <>
        <Container>
            <FrontBox onClick={() => {
                setShowState('show')
                setBtnState('hide')
            }} className={btnState}>
                <span>실시간</span>
                <p>챗봇상담</p>       
            </FrontBox>
            <BackBox className={showState}>
                {userInfo.hsctPatntAt === '1'  &&
                    <div className='cont-box'>
                        <button onClick={()=> navigate(URL.NUTRITION_CHAT)}>
                            <span>영양챗봇</span>
                        </button>
                    </div>
                }
                <div className='cont-box'>
                    <button onClick={()=> navigate(URL.SERVICE_CHAT)}>
                        <span>서비스 안내</span>
                        {/* <p>이용안내</p> */}
                    </button>
                </div>
                <div className='colse-box'>
                    <button onClick={ () => {
                        setBtnState('show');
                        setShowState('hide');        
                    }
                    }>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                
            </BackBox>
        </Container>
       </>
    );
};

export default DialBox;