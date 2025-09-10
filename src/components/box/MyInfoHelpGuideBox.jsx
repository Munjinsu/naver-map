import React from 'react';
import styled from 'styled-components';
import imgClose from '../../images/common/i_close_btn.svg'


// 내정보 헬프 가이드 박스 
// (기본정보 / 주요 진단/ 알레르기/ 과거력/ 가족력/ 주요 수술/ 처치력 /주요 약물력/ 현재 복용중인 약물/ 주요 검사 결과 / 주치의 정보)

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
`;

const ListBox = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const List = styled.li`
    display: flex;
    align-items: flex-start;
    gap:10px;
    &::before {
        content:""; 
        display:block; 
        width:3px; 
        height:3px; 
        border-radius:50%;
        background-color:#4C5258;
        transform: translateY(8px);
    }
        & > p {
        font-size:14px;
        }
`;


const MyInfoHelpGuideBox = ({onClose, code}) => { 

    const text = (() => {
                    switch (code) {
                        case 1:
                            return "기본 정보";
                        case 2:
                            return "주요 진단";
                        case 3:
                            return "알레르기";
                        case 4:
                            return "과거력";
                        case 5:
                            return "가족력";
                        case 6:
                            return "주요 수술/처치력";
                        case 7:
                            return "주요 약물력";
                        case 8:
                            return "현재 복용중인 약물";
                        case 9:
                            return "주요 검사 결과";
                        case 10:
                            return "주치의 정보";    
                        default:
                            return null;
                    }
                  })();

    return (
        <ContentWrap>
            <InnerBox>
                <strong>
                {
                 (() => {
                    switch (code) {
                        case 1:
                            return "기본 정보";
                        case 2:
                            return "주요 진단";
                        case 3:
                            return "알레르기";
                        case 4:
                            return "과거력";
                        case 5:
                            return "가족력";
                        case 6:
                            return "주요 수술/처치력";
                        case 7:
                            return "주요 약물력";
                        case 8:
                            return "현재 복용중인 약물";
                        case 9:
                            return "주요 검사 결과";
                        case 10:
                            return "주치의 정보";    
                        default:
                            return null;
                    }
                  })()
                }
                    
                </strong>

                <ContentBox>
                    <ListBox>
                        <List>
                            <p>{text} 데이터 노출의 정의 및 노출 기준을 제공합니다.</p>
                        </List>
                        <List>
                            <p>데이터 노출의 정의 및 노출 기준을 제공합니다.</p>
                        </List>
                        <List>
                            <p>데이터 노출의 정의 및 노출 기준을 제공합니다.</p>
                        </List>
                    </ListBox>

                </ContentBox>

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default MyInfoHelpGuideBox;