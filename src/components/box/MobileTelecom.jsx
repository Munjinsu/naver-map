import React from 'react';
import styled from 'styled-components';
import imgClose from '../../images/common/i_close_btn.svg'


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
        font-size: var(--mo-fz-lg); 
        color: var(--color-main-black); 
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
    gap: var(--sp-24);
`;

const List = styled.li`
    display: flex;
    align-items: flex-start;
    gap:10px;
    & > button {
        background-color: transparent;
        font-size: var(--mo-fz-md);
        color: var(--color-main-black);
        }
`;


const MobileTelecom = ({onClose, onSelect }) => { 

    const telecomList = [
        'SKT', 'KT', 'LG U+',
        'SKT 알뜰폰', 'KT 알뜰폰', 'LG U+ 알뜰폰'
    ];

    return (
        <ContentWrap>
            <InnerBox>
                <strong>통신사 선택</strong>

                <ContentBox>
                    
                        <ListBox>
                        {telecomList.map((item, index) => (
                            <List key={index}>
                                <button onClick={() => onSelect(item)}>{item}</button>
                            </List>
                        ))}
                        </ListBox>
                    

                </ContentBox>

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default MobileTelecom;