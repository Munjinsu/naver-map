import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import ImgPill from '../../images/user/img_pill.png';
import axiosApi from '../../api/daonAxios';
import CODE from '../../constants/code';

// 약품 상세 컴퍼넌트트

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
        font-size: var(--mo-fz-lg); 
        color: var(--color-main-gray); 
    }
    & > span {
    display: block;
    width: 100%;
    margin-top: var(--sp-12);
    text-align: center;
    font-size: var(--mo-fz-smd); 
    color: var(--color-main-gray); 
    }
    &  .close-btn {
        position: absolute; 
        top: var(--sp-16); 
        right: var(--sp-16);
        width: var(--sp-24); 
        height: var(--sp-24);
        background: url(/images/common/i_close_btn.svg) no-repeat center;
        background-size: 100%;
    }
`;

const ContentBox = styled.div`
    display: block;
    width: 100%;
    margin-top: var(--sp-12);
`;

const DetailBox = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: var(--sp-12); 
    padding-bottom: var(--sp-16);

    & .img-box {
        overflow: hidden; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border-radius: var(--radius-8);
        & img {
            display: block; width: 100%; height: 100%;
        }
    }
        
    & .infom-box {
        & p {
            font-size: var(--mo-fz-smd); 
            color: var(--color-main-gray); 
            font-weight: var(--fz-weight-700);
        }
        & span {
            font-size: var(--mo-fz-sm); 
            color: var(--color-main-gray);
        }
        & .list-box li {
            display: flex; 
            align-items: flex-start; 
            gap: var(--sp-04); 
            font-size: var(--mo-fz-sm); 
            color: var(--color-main-gray);
        }
        & .list-box li::before {
            content: "-"; 
            display: flex; 
            align-items: center; 
            justify-content: center;
        }
    }
    
`;



const PillDetailInformBox = ({hsptlCd, mdctnNo, onClose}) => {

    const [clnicMedDtlInfo, setClnicMedDtlInfo] = useState({});

    useEffect(()=>{
        getClnicInfo();
    }, [])

    const getClnicInfo = useCallback(async () => {


        const url = "/hsptl/retrieveHsptlClnicMedDtlInfo";
        const jToken = localStorage.getItem('jToken');
        const reqParam = {
            hsptlCd : hsptlCd, 
            mdctnNo : mdctnNo
        }

        const reqOptions = {
            headers: {
                Authorization: jToken,
            }
            , withCredentials: true
        }

        await axiosApi.post(url, reqParam, reqOptions)
        .then((res) => {
            if (res.data.resultCode === CODE.RCV_SUCCESS) {
                const mediInfo = res.data.result;
                setClnicMedDtlInfo(mediInfo.clnicMedDtlInfo);
            } else {
                alert(res.data.resultMessage);
            }
        })
        .catch(err => {
            console.error("사용자의료건강정보 호출 중 오류  : ", err);
        })

    }, []);


    return (
        <ContentWrap>
            <InnerBox>
                <strong>
                    약품 상세
                </strong>
                <ContentBox>

                    <DetailBox>
                        {clnicMedDtlInfo?.mdctnImg && (
                            <div className='img-box'>
                                <img src={`data:image/gif;base64,${clnicMedDtlInfo.mdctnImg}`} alt="" />
                            </div>
                        )}
                        <div className='infom-box'>
                            <p>약품명</p>
                            <span>{clnicMedDtlInfo.mdctnNm}</span>   
                        </div>
                        <div className='infom-box'>
                            <p>성분명</p>
                            <span>{clnicMedDtlInfo.ingrdntNm}</span>   
                        </div>
                        <div className='infom-box'>
                            <p>효능·효과</p>
                            <span>{clnicMedDtlInfo.efficacy}</span>   
                        </div>
                        <div className='infom-box'>
                            <p>부작용 및 주의사항</p>
                            <ul className='list-box'>
                                {clnicMedDtlInfo.sideEffect}
                            </ul>
                        </div>
                        
                    </DetailBox>

                </ContentBox>

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default PillDetailInformBox;