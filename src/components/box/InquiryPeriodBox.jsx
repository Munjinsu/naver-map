import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomDatePicker from '../datepicker/CustomDatePicker';
import imgCloseBtn from '../../images/common/i_close_btn.svg';

import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';


// 조회 기간 컴퍼넌트


const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 3.8rem 1.6rem 1.6rem; 
    & strong {
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
        background: url(${imgCloseBtn}) no-repeat center;
        background-size: 100%;
    }
`;

const SelectPeriodBox = styled.div`
    display: block;
    width: 100%;
    & ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--sp-08);
        margin-top: var(--sp-12);
        & li {
            flex-grow: 1;
            flex-basis: 0;
        }
    }
`;

const SelectDayBox = styled.div`
    display: block;
    width: 100%;
    margin-top: var(--sp-20);
    & .input-box {
        margin-top: var(--sp-12);
    }
`;


const BottomBox = styled.div`
    display: block;
    width: 100%;
    & button {
        width: 100%;
        margin-top: var(--sp-40);
    }
`;

const InquiryPeriodBox = ({onClose, isAccepted}) => {

    const [daySelectOpen, setDaySelectOpen] = useState(false);
    const [selectInputValue, setSelectInputValue] = useState(false);

    useEffect(() => {
        setDaySelectOpen(false);
    }, []);

    function onDismiss() {
        setDaySelectOpen(false);
        isAccepted(false);
    }

    const inputHandle = (e) => {    
        let currentValue = e.target.value;

        if(currentValue === "disabled"){
            setSelectInputValue(false);
        }else {
            setSelectInputValue(true);
        }   
    }

    const openDaySetting = ()=> {
        setDaySelectOpen(true);
        //isAccepted(true);
    }
 

    

    return (
        <ContentWrap>
            <InnerBox>
                <SelectPeriodBox>
                    <strong>조회 기간</strong>
                    <ul>
                        <li>
                            <div className='radio-selectbox' data-style="b">
                                <input type="radio" id="year1" name='year-select' value="disabled" onClick={(event)=> inputHandle(event)}/>
                                <label htmlFor="year1">
                                    <span>1년</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className='radio-selectbox' data-style="b">
                                <input type="radio" id="year2" value="disabled" name='year-select' onClick={(event)=> inputHandle(event)}/>
                                <label htmlFor="year2">
                                    <span>2년</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className='radio-selectbox' data-style="b">
                                <input type="radio" id="year3" value="disabled" name='year-select' onClick={(event)=> inputHandle(event)}/>
                                <label htmlFor="year3">
                                    <span>3년</span>
                                </label>
                            </div>
                        </li>
                        <li>
                            <div className='radio-selectbox' data-style="b">
                                <input type="radio" id="custom" value="custom" name='year-select' onClick={(event)=> inputHandle(event)}/>
                                <label htmlFor="custom">
                                    <span>직접입력</span>
                                </label>
                            </div>
                        </li>
                    </ul>
                </SelectPeriodBox>

                <SelectDayBox>
                    <strong>시작일</strong>
                    <div className='input-box' data-type='d'>

                        {selectInputValue ? (
                            <input type="text" inputmode="none" id="pill-name" placeholder='시작일 선택' value="" onClick={() => openDaySetting()} />        
                        ) : (
                            <input type="text" disabled inputmode="none" id="pill-name" value="2025.01.11" />    
                        )}    
                        

                    </div>
                </SelectDayBox>

                <SelectDayBox>
                <strong>종료일</strong>
                    <div className='input-box' data-type='d'>


                        {selectInputValue ? (
                            <input type="text" inputmode="none" id="pill-name"  placeholder='종료일 선택' value="" onClick={() => openDaySetting()} />
                        ) : (
                            <input type="text" disabled inputmode="none" id="pill-name" value="2025.01.11" />    
                        )}
                        
                    </div>
                </SelectDayBox>


                <BottomBox>
                    <button className="btn" data-btn-type="fill-main" data-btn-size="lg" onClick={onClose}>
                        <span>확인</span>
                    </button>
                </BottomBox>

                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>


            <BottomSheet
                scrollLocking={false} // 내부 스크롤을 위해 BottomSheet 스크롤 잠금 해제
                expandOnContentDrag={false} // 내용 드래그로 확장 방지
                open={daySelectOpen}

                onDismiss={onDismiss}
                snapPoints={({ minHeight }) => minHeight}
                blocking={true}
                >
                <CustomDatePicker onClose={onDismiss}/>
            </BottomSheet>


        </ContentWrap>


    );
};

export default InquiryPeriodBox;
