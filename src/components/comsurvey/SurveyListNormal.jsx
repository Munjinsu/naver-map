import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';


// 설문지 소개 페이지

const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: var(--sp-48);
`;
const StyledRadioBox = styled.div`
  &.radio-selectbox.selected label,
  &.chkbox-custom.selected label {
    background-color: var(--color-main-5);
    color: white;
    border-radius: var(--radius-12);
  }
`;
const QuestionTitle = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--mo-fz-md);
    font-weight: var(--fz-weight-400);
    color: var(--color-main-gray);
    white-space: pre-wrap;
    text-align: center;
`;

const TopQuestionTitle = styled.strong`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--sp-08);
    font-size: var(--mo-fz-md);
    font-weight: var(--fz-weight-700);
    color: var(--color-main-5);
    white-space: pre-wrap;
    text-align: center;
`;

const SelectListBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--sp-12);
    width: 100%;
    margin-top: var(--sp-20);
    & > ul {
        display: flex; 
        flex-direction: column;
        gap: var(--sp-12);
        width: 100%;   
        & >  li {
            width: 100%;
        } & label {
            white-space: pre-wrap;
            text-align: center;
        }
    }
`;

const loadEffect3 = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  65% {
    opacity: 0.65;
    transform: scale(1.01);
  }
  85% {
    opacity: 0.85;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const AnimatedUl = styled.ul`
  display: flex; 
  flex-direction: column;
  gap: var(--sp-12);
  width: 100%;
  animation: ${loadEffect3} 0.5s ease-in-out;
    & li:first-child {
        & .imgbox {
            margin-top: var(--sp-10);
        }
    } 
  &.select-img-listbox {
    flex-wrap: wrap;
    flex-direction: row;
    gap: var(--sp-08) var(--sp-08);
    max-width: 32rem;
        & li {
            width: calc(50% - var(--sp-08));
        }
  }      
`;


const ImgBoxCont = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--sp-08);
    margin-top: var(--sp-38);
    gap: var(--sp-08);
        & div {
            overflow: hidden;
            width: 100%;
            border-radius: var(--radius-12);
            & img {
                display: block;
                width: 100%; 
                object-fit: contain;
            }
        }
    &[data-img-layout="lay2x2"] {
        flex-wrap: wrap;
        margin-bottom: var(--sp-20);
        & > div {
            width: calc(50% - var(--sp-08));
        }
    }        
`;

const ImgCopyright = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: var(--sp-08);
    margin-top: var(--sp-60);
    padding-top: var(--sp-08);
    gap: var(--sp-08);
    border-top: 1px solid rgba(180, 184, 190, 0.7);
        & > p {
            font-size: var(--mo-fz-sm);
            font-weight: var(--fz-weight-700);
            color: var(--color-main-gray-5);
        }
        & ul li {
            position: relative;
            padding-left: var(--sp-18);
            line-height: 1.1;
                & p {
                    display: inline-block;
                    font-size: var(--mo-fz-sm);
                    font-weight: var(--fz-weight-700);
                    color: var(--color-main-gray-5);
                }
                & span {
                    word-break: break-all;
                    font-size: var(--mo-fz-sm);
                    font-weight: var(--fz-weight-400);
                    color: var(--color-main-gray-5);
                }    
            &:before {
                content: "";
                position: absolute;
                display: block;
                width: 3px;
                height: 3px;
                border-radius: 100%;
                background-color: var(--color-main-gray-5);
                top: var(--sp-08) ;
                left: var(--sp-08);
            }        
        }    
`;


const ImgSelectBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
        & > .img-select-inner {
            position: relative;
            width: 100%;
            &  label {
                background-size: 100% 100% ;
                background-position: center;
                background-repeat: no-repeat;
                width: 148px;
                height: 148px;
                &:before {
                    top: 80% !important;
                    left: 80% !important;
                }
                &:after {
                    top: 80% !important;
                    left: 80% !important;
                }
            }
             & .score-box {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: var(--sp-08);
                left: var(--sp-08);
                z-index: 1;
                height: var(--sp-20);
                padding: 0 var(--sp-10);
                border-radius: var(--radius-20);
                background-color: rgba(0, 0, 0, 0.7);
                font-size: var(--mo-fz-sm);
                font-weight: var(--fz-weight-700);
                color: var(--color-white);
            }
            & .radio-selectbox.selected label {
                outline: 3px solid var(--color-main-5);
                border-radius: var(--radius-12);
            }    
        }
       
`;


const SurveyListNormal = ({surveyData, selectedValue, onChange, step }) => {
    const { type, question, name, options } = surveyData;

    const isMulti = type === 'multi';

    const BoldText = ({ text }) => {
            const parts = text.split(/(\*[^*]+\*)/g); 
    
            return (
                <>
                    {parts.map((part, idx) => {
                        if (part.startsWith('*') && part.endsWith('*')) {
                            const boldText = part.slice(1, -1);
                            return <strong key={idx}>{boldText}</strong>;
                        }
                        
                        return part.split('\n').map((line, i) => (
                            <React.Fragment key={`${idx}-${i}`}>
                                {line}
                                {i < part.split('\n').length -1 && <br />}
                            </React.Fragment>
                        ));
                    })}
                </>
            );
    };

    return (
        
        <ContentWrap>

             {/* 질문 카레고리 */}
            {surveyData.topQuestion && (
                <TopQuestionTitle>{surveyData.topQuestion}</TopQuestionTitle>    
            )}

            {/* 질문 내용 */}
            <QuestionTitle>
                <BoldText text={question} />
            </QuestionTitle>


            {/* 선택 리스트 */}
            <SelectListBox>
                <AnimatedUl key={step} className={type === 'selectImg' && 'select-img-listbox'}>
                    {options.map((opt, index) => {
                        const inputId = `${name}_${index}`;
                        const isChecked = selectedValue.includes(opt.value);
                        return (
                            <li key={opt.value}>
                                <div>

                                    {opt.images && opt.images.length > 0 && (
                                        <ImgBoxCont className='imgbox' data-img-layout={opt.images.length === 4 ? "lay2x2" : ""}>
                                            {opt.images && opt.images.map((img, idx) => (
                                                <div key={idx}>
                                                <img 
                                                    src={`${process.env.PUBLIC_URL}/${img}`} 
                                                    alt={`option-${opt.value}-img-${idx}`} 
                                                    />
                                                </div>
                                            ))}
                                        </ImgBoxCont>
                                    )}


                                    {type === "selectImg" ? (
                                        <ImgSelectBox>
                                            <div className="img-select-inner">
                                            <span className="score-box">{opt.score}</span>
                                            <div className={`radio-selectbox ${isChecked ? "selected" : ""}`} 
                                                data-style="chk-box">
                                                <input
                                                type="radio"
                                                id={inputId}
                                                name={name}
                                                value={opt.value}
                                                checked={isChecked}
                                                onChange={(e) => onChange(e, opt.value)}
                                                />
                                                <label
                                                htmlFor={inputId}
                                                style={{
                                                    backgroundImage: `url(${process.env.PUBLIC_URL}/${opt.bg})`,
                                                }}
                                                ></label>
                                            </div>
                                            </div>
                                        </ImgSelectBox>
                                        ) : (
                                        <StyledRadioBox
                                            className={`${isMulti ? "chkbox-custom" : "radio-selectbox"} ${isChecked ? "selected" : ""}`}
                                            data-chkbox={isMulti && "list-btn"}
                                        >
                                            <input
                                            type={isMulti ? "checkbox" : "radio"}
                                            id={inputId}
                                            name={name}
                                            value={opt.value}
                                            checked={isChecked}
                                            onChange={(e) => onChange(e, opt.value)}
                                            />
                                            <label htmlFor={inputId}>
                                            <span>
                                               {opt.label && Array.isArray(opt.label)
                                                ? opt.label.map((part, idx) => (
                                                    <span
                                                    key={idx}
                                                    style={{
                                                        fontWeight: part.weight === "bold" ? "700" : "400",
                                                        whiteSpace: 'pre-wrap' // \n 줄바꿈 처리
                                                    }}
                                                    >
                                                    {part.text}
                                                    </span>
                                                ))
                                                : opt.label}
                                            </span>
                                            
                                            </label>
                                        </StyledRadioBox>
                                        )}

                                </div>
                            </li>
                        );
                    })}
                </AnimatedUl>
            </SelectListBox>

                 {surveyData.copyright && (
                    <ImgCopyright>
                        <p>이미지 출처</p>
                        <ul>
                            {surveyData.copyright.map((copy, idx) => (
                                <li key={idx}>
                                    {copy.tit && (<p>{copy.tit}: </p>)}
                                    
                                    <span> {copy.url}</span>
                                </li>
                            ))}
                        </ul> 
                    </ImgCopyright>
                 )}   
                
                        
                    
           

        </ContentWrap>
        
    );
};

export default SurveyListNormal;