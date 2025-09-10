import React from 'react';
import styled from 'styled-components';
import imgCall from '../../images/user/i_call_gray.svg';
import {formatDateWithWeekday} from '../../assets/js/comm';

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

const SubTxt = styled.div`
    display: block;
    max-width: 25rem;
    margin-top: var(--sp-12);
    text-align: center;
    font-size: var(--mo-fz-smd);
    color: var(--color-main-gray);
`;

const Notibox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--sp-12);
    margin-top: var(--sp-20);
    & > p {
        font-size: var(--mo-fz-md);
        font-weight: var(--fz-weight-700);
        color: var(--color-main-gray);
    }
    & > span {
        display: flex;
        justify-content: center;
        align-items: center;
        height: var(--sp-30);
        padding: 0 var(--sp-12);
        border-radius: var(--radius-100);
        background-color: var(--color-main-25);
        font-size: var(--mo-fz-md);
        font-weight: var(--fz-weight-700);
        color: var(--color-main-5);
    }
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

const LayoutBox = styled.div`
    display: block;
    width: 100%;
    padding: var(--sp-16);
    border-radius: var(--radius-20);
    background-color: var(--color-main-gray-45);
    & > ul {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: var(--sp-12);
        line-height: normal;
        & > li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            & p {
                font-size: var(--mo-fz-sm);
                font-weight: var(--fz-weight-700);
                color: var(--color-main-gray);
            }
            & span {
                font-size: var(--mo-fz-sm);
                font-weight: var(--fz-weight-400);
                color: var(--color-main-gray);
            }
        }
    }
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


const SurveyMain = ({data}) => {
    const endDate = data?.srveyEndDe;
    const target = endDate
        ? new Date(`${endDate.slice(0,4)}-${endDate.slice(4,6)}-${endDate.slice(6,8)}`)
        : null;
    const getRemainDays = () => {
        if (!endDate) return '';
        const today = new Date();
        const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        return `${diff} 일 남음`;
    };


    return (
        <ContentWrap>
            <div className='animation-3'>
                <TopCont>
                    <TitleTxt>{data?.srveySj}</TitleTxt>
                    <SubTxt>{data?.srveyDc1}</SubTxt>
                    {target&&<Notibox>
                        <p>{formatDateWithWeekday(endDate)} 까지 작성해주세요!</p>
                        <span>{getRemainDays()}</span>
                    </Notibox>}
                </TopCont>

                <MidCont>
                    <LayoutBox>
                        <ul>
                            <li><p>병원</p><span>{data?.insttNm}</span></li>
                            <li><p>진료과</p><span>{data?.cnncDeptNm}</span></li>
                            <li><p>참여방식</p><span>{data?.prtcpMthdNm}</span></li>
                            <li><p>소요시간</p><span>{data?.reqreTmCn}</span></li>
                        </ul>
                    </LayoutBox>
                    <ListsBox>
                        <p>응답 결과는 진료 및 치료계획 수립과 같은 진료 목적과 혈액질환에 대한 연구 자료로 활용됩니다.</p>
                        <p>본 설문은 자발적인 참여를 바탕으로 하며, 원하실 때 언제든지 참여를 중단하실 수 있습니다.</p>
                    </ListsBox>
                </MidCont>

                <BotCont>
                    <p>문의처: {data?.insttNm} {data?.cnncDeptNm}</p>
                    <p><object data={imgCall} /> {data?.repTelNo}</p>
                </BotCont>
            </div>
        </ContentWrap>
    );
};

export default SurveyMain;