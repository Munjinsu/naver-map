import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import imgCloseBtn from "../../images/common/i_close_btn.svg";
import imgCallBtn from "../../images/user/i_call.svg";
import imgLocation from "../../images/common/i_location.svg";
import axiosApi from '../../api/daonAxios';
import CODE from '../../constants/code';
import PharmacyCallButtonBox from './PharmacyCallButtonBox';



// 병원케어  >  진료내역 > 진료 상세 > 처방전 확인 > 근처약국찾기 > 약국 세부 정보 

const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 3rem 1.6rem 1.6rem; 
    & > strong {
        display: block;
        width: 100%;
        font-size: var(--mo-fz-lg); 
        color: var(--color-main-gray); 
    }

    &  .close-btn {
        position: absolute; 
        top: var(--sp-16); 
        right: var(--sp-16);
        width: var(--sp-24); 
        height: var(--sp-24);
        background: url(${imgCloseBtn}) no-repeat center;
        background-size: 100%;
    }
`;

const ContentTopBox = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: var(--sp-08);
    width: 100%;
    margin-top: var(--sp-10);
    padding-bottom: var(--sp-12);
    border-bottom: 1px solid var(--color-main-gray-50);
        & .inf-01 {
            display: flex;
            align-items: center; 
            gap: var(--sp-08);
            & span[data-state] {display: inline-flex; align-items: center; height: var(--sp-18); font-size: 1.1rem; font-weight: var(--fz-weight-700);} 
            & span[data-state]::after {display: flex; align-items: center; height: 100%; padding: 0 var(--sp-08); border-radius: 10rem;}
            & span[data-state="1"]::after {content: "영업중"; background-color: var(--color-main-25); color: var(--color-main-5); }
            & span[data-state="2"]::after {content: "영영종료"; background-color: var(--color-main-gray-50); color: var(--color-main-gray-5); }
        }
        & .inf-02 {
            & span {display: flex; align-items: center; gap: var(--sp-06); font-size: var(--mo-fz-smd); color: var(--color-main-gray);}
            & span:before {content:""; display: block; flex-shrink: 0; width: var(--sp-18); height: var(--sp-18); background: url(${imgCallBtn}) no-repeat center;}
        }
        & .inf-03 {
            & span {display: flex; align-items: center; gap: var(--sp-06); font-size: var(--mo-fz-sm); color: var(--color-main-gray);}
            & span:before {content:""; display: block; flex-shrink: 0; width: var(--sp-18); height: var(--sp-18); background: url(${imgLocation}) no-repeat center;}
        }   
`;

const ContentBottomBox = styled.div`
    display: flex; 
    flex-direction: column; 
    gap: var(--sp-08);
    width: 100%;
    margin-top: var(--sp-10);
        & > p {
            font-size: var(--mo-fz-md); color: var(--color-main-gray); font-weight: var(--fz-weight-700);
        }
        & > span {
            font-size: var(--mo-fz-sm); color: var(--color-main-gray);
        }
        & .num-list-box {
            display: flex; 
            flex-direction: column; 
            gap: var(--sp-08);
                & li > p {font-size: var(--mo-fz-sm); color: var(--color-main-gray); font-weight: var(--fz-weight-700);}    
                & li > span {padding-left: var(--sp-12); font-size: var(--mo-fz-sm); color: var(--color-main-gray);}
                & ~ li {margin-top: var(--sp-04);} 
        }
        & .btn-group {
            display: flex; 
            flex-direction: column; 
            gap: var(--sp-12);
        }                 
`;



const PharmacyDetailsBox = ({onClose, pharmacy}) => {

   
    return (
        <ContentWrap>
            <InnerBox>
                <strong>{pharmacy.name} </strong>

                <ContentTopBox>
                    <div className='inf-01'>
                        <span data-state='1'></span>
                        <span>09:00~18:00</span>
                    </div>
                    <div className='inf-02'>
                        <span>{pharmacy.phone}</span>
                    </div>
                    <div className='inf-03'>
                        <span>{pharmacy.address}</span>
                    </div>
                </ContentTopBox>

                <ContentBottomBox>
                    <p>처방전 전송 방법</p>
                    <span>약국에 처방전을 직접 전송할 수 없어요. <br />
                        아래 방법을 이용하여 처방전으로 전송해주세요.
                    </span>
                    <ul className='num-list-box'>
                        <li>
                            <p>1. 약국에 전화하기</p>
                            <span>약국에 전화해서 조제 가능 여부를 먼저 확인해주세요.</span>
                        </li>
                        <li>
                            <p>2. 병원에 전화하기</p>
                            <span>병원에 전화해서 해당 약국으로 처방전 전송을 요청해주세요.</span>
                        </li>
                    </ul>
                    <ul className='btn-group'>
                        <li>
                            <PharmacyCallButtonBox type='a' phoneNumber='010-1234-5678'/>
                        </li>
                        <li>
                            <PharmacyCallButtonBox type='b' phoneNumber='010-1234-5678'/>
                        </li>
                        
                    </ul>

                </ContentBottomBox>

                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
                
            </InnerBox>
        </ContentWrap>
    );
};

export default PharmacyDetailsBox;