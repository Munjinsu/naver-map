import React from 'react';
import styled from 'styled-components';
import imgCall from '../../images/user/i_call_gray.svg';

// 설문지 소개 페이지

const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: var(--sp-52);
`;

const TopCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const TitleTxt = styled.strong`
    display: block;
    font-size: var(--mo-fz-xlg);
    font-weight: var(--fz-weight-700);
    color: var(--color-main-5);
`;


const MidCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    gap: var(--sp-12);
    margin-top: var(--sp-20);
`;

const ListsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & p {
        display: flex;
        font-size: var(--mo-fz-sm);
        font-weight: var(--fz-weight-400);
        color: var(--color-main-gray-5);
        &::before {
            content: "";
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: 0.25rem;
            height: 0.25rem;
            margin: var(--sp-08) var(--sp-08) 0 var(--sp-08);
            border-radius: var(--radius-full);
            background-color: var(--color-main-gray-5);
        }
    }
`;

const BotCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--sp-04);
    margin-top: var(--sp-20);
    & > p {
        display: flex;
        align-items: center;
        gap: var(--sp-04);
        font-size: var(--mo-fz-smd);
        font-weight: var(--fz-weight-700);
        color: var(--color-main-gray-5);
    }
`;


const SurveyComplete = () => {

  
    return (
        <ContentWrap>
            <div className='animation-3'>
                <TopCont>
                    <TitleTxt>설문이 완료되었습니다.</TitleTxt>
                </TopCont>

                <MidCont>
                    <ListsBox>
                        <p>응답 결과는 진료 및 치료계획 수립과 같은 진료 목적과 혈액질환에 대한 연구 자료로 활용됩니다.</p>
                        <p>본 설문은 자발적인 참여를 바탕으로 하며, 원하실 때 언제든지 참여를 중단하실 수 있습니다.</p>
                    </ListsBox>
                </MidCont>

                <BotCont>
                    <p>문의처: 서울성모병원 혈액병원</p>
                    <p><object data={imgCall} /> 1588-1511</p>
                </BotCont>
            </div>
        </ContentWrap>
    );
};

export default SurveyComplete;