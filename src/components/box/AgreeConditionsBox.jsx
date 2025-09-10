import React from 'react';
import styled from 'styled-components';
import imgClose from '../../images/common/i_close_btn.svg'


//챗봇 > 서비스 이용 안내 > 전체보기기

const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 1.6rem 1.6rem 1.6rem; 
    
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




const AgreeConditionsBox = ({title ,onClose, children}) => {

    return (
        <ContentWrap>
            <InnerBox>

                <TitleBox>{title ? title : "약관 동의" }</TitleBox>    
                <ContentBox>
                    {children}
                    {/* <p>홈 케어 &gt; 오늘 할 일에서는 의료진이 기록을 요청한 복약 기록, 건강 기록 목록들을 확인할 수 있습니다.
                        해당 화면에서는 일자 별 복약 유무를 기록하고 감정 일지, 부작용 일지, 식단 일지, 배뇨/배변 일지 등 다양한 건강 기록을 작성할 수 있습니다.
                        작성한 내용은 의료진에게 실시간으로 전달 되며 다음 번 진료 시 참고 자료로 활용됩니다.
                    </p>   
                    <p>홈 케어 &gt; 오늘 할 일에서는 의료진이 기록을 요청한 복약 기록, 건강 기록 목록들을 확인할 수 있습니다.
                        해당 화면에서는 일자 별 복약 유무를 기록하고 감정 일지, 부작용 일지, 식단 일지, 배뇨/배변 일지 등 다양한 건강 기록을 작성할 수 있습니다.
                        작성한 내용은 의료진에게 실시간으로 전달 되며 다음 번 진료 시 참고 자료로 활용됩니다.
                    </p>   
                    <p>홈 케어 &gt; 오늘 할 일에서는 의료진이 기록을 요청한 복약 기록, 건강 기록 목록들을 확인할 수 있습니다.
                        해당 화면에서는 일자 별 복약 유무를 기록하고 감정 일지, 부작용 일지, 식단 일지, 배뇨/배변 일지 등 다양한 건강 기록을 작성할 수 있습니다.
                        작성한 내용은 의료진에게 실시간으로 전달 되며 다음 번 진료 시 참고 자료로 활용됩니다.
                    </p>   
                    <p>홈 케어 &gt; 오늘 할 일에서는 의료진이 기록을 요청한 복약 기록, 건강 기록 목록들을 확인할 수 있습니다.
                        해당 화면에서는 일자 별 복약 유무를 기록하고 감정 일지, 부작용 일지, 식단 일지, 배뇨/배변 일지 등 다양한 건강 기록을 작성할 수 있습니다.
                        작성한 내용은 의료진에게 실시간으로 전달 되며 다음 번 진료 시 참고 자료로 활용됩니다.
                    </p>   
                    <p>홈 케어 &gt; 오늘 할 일에서는 의료진이 기록을 요청한 복약 기록, 건강 기록 목록들을 확인할 수 있습니다.
                        해당 화면에서는 일자 별 복약 유무를 기록하고 감정 일지, 부작용 일지, 식단 일지, 배뇨/배변 일지 등 다양한 건강 기록을 작성할 수 있습니다.
                        작성한 내용은 의료진에게 실시간으로 전달 되며 다음 번 진료 시 참고 자료로 활용됩니다.
                    </p>   
                    <p>홈 케어 &gt; 오늘 할 일에서는 의료진이 기록을 요청한 복약 기록, 건강 기록 목록들을 확인할 수 있습니다.
                        해당 화면에서는 일자 별 복약 유무를 기록하고 감정 일지, 부작용 일지, 식단 일지, 배뇨/배변 일지 등 다양한 건강 기록을 작성할 수 있습니다.
                        작성한 내용은 의료진에게 실시간으로 전달 되며 다음 번 진료 시 참고 자료로 활용됩니다.
                    </p>    */}

                </ContentBox>

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default AgreeConditionsBox;