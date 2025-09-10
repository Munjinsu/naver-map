import React from 'react';
import styled from 'styled-components';
import imgClose from '../../images/common/i_close_btn.svg'


//챗봇 > 서비스 이용 안내 > 전체보기

const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 3.8rem 1.6rem 1.6rem; 
    & > strong {
        display: block;
        width: 100%;
        padding-bottom: 1rem;
        border-bottom: 1px solid #E2E6EC;
        font-size: 1.6rem; 
        color: #10141A; 
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
    margin-top: 1rem;
    & p {
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray);
    }
`;

const TitleBox = styled.strong`
    font-size: var(--mo-fz-lg);
    color: var(--color-main-gray);
    font-weight: var(--fz-weight-700);
`;




const ChatBotServiceInformBox = ({onClose, text}) => {
    return (
        <ContentWrap>
            <InnerBox>

                <TitleBox>AI 상담사</TitleBox>    
                <ContentBox>
                    <p>{text}</p>   

                </ContentBox>

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default ChatBotServiceInformBox;