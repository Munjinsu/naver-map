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
    padding: 2.5rem 1.6rem 1.6rem; 
    & > strong {
        display: block;
        width: 100%;
        font-size: 1.8rem; 
        color: var(--color-main-gray); 
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
    margin-top: var(--sp-04);
    & > span {
        font-size: var(--mo-fz-smd); 
        color: var(--color-main-gray); 
    }
`;

const ListBox = styled.ul`
    display: flex;
    flex-direction: column;
    gap: var(--sp-20);
    margin-top: var(--sp-20);
    margin-left: var(--sp-10);
`;

const List = styled.li`
    display: flex;
    align-items: flex-start;
    gap:10px;
    &::before {
        content:""; 
        display:block; 
        flex-shrink: 0;
        width:3px; 
        height:3px; 
        border-radius:50%;
        background-color:#4C5258;
        transform: translateY(8px);
    }
        & > p {
        font-size:var(--mo-fz-smd);
        color: var(--color-main-gray);
        }
`;


const NutritionChatCautionBox = ({onClose, txtNum}) => { 
    return (
        <ContentWrap>
            <InnerBox>
                <strong>
                    주의사항
                </strong>
                {txtNum === 1 &&
                    <ContentBox>
                        <span>다음은 음식 조리 및 섭취 장소에 따른 주의 사항입니다.</span>
                        <ListBox>
                            <List>
                                <p>재료 구매 및 조리 과정에서 위생 관리를 철저히 합니다.</p>
                            </List>
                            <List>
                                <p>공통으로 먹는 음식은 따로 덜어서 먹습니다.</p>
                            </List>
                            <List>
                                <p>외식은 퇴원 후 초기에는 권장하지 않습니다.</p>
                            </List>
                            <List>
                                <p>외부에서 음식 구매 및 배달은 권장하지 않으며, 만약 구매 및 배달하실 경우에는 집에서 재가열 후에 섭취해야 합니다.</p>
                            </List>
                            <List>
                                <p>길거리에서 구매한 음식은 섭취가 제한됩니다.</p>
                            </List>
                        </ListBox>
                    </ContentBox>
                }
                {txtNum === 2 &&
                    <ContentBox>
                        <span>다음은 면역억제제 섭취 시 주의 사항입니다.</span>
                        <ListBox>
                            <List>
                                <p>면역억제제 복용기간 동안에는 자몽이나 자몽쥬스를 먹지 않습니다.</p>
                            </List>
                            <List>
                                <p>면역억제제는 반드시 물과 함께 복용합니다(다른 음료수로 복용하지 않습니다)</p>
                            </List>
                            <List>
                                <p>고지방성 식사/지용성 비타민과 함께 면역억제제를 복용 시 흡수율이 높아지므로 주의하여야 합니다.</p>
                            </List>
                        </ListBox>
                    </ContentBox>
                }

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default NutritionChatCautionBox;