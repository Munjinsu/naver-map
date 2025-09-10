import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';


// 설문지 유형 11

const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: var(--sp-32);
`;

const TopTitle = styled.strong`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--mo-fz-md);
    color: var(--color-main-5);
    font-weight: var(--fz-weight-700);
`;

const SelectListBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 33rem;
    margin: var(--sp-40) auto 0 auto;
    

    & > ul {
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: var(--sp-80);
      
        & > li {
          display: flex;
          flex-direction: column;
          gap: var(--sp-16);
        }
    }
`;

const QuestionTitle = styled.p`
    display: flex;
    align-items: flex-start;
    gap: var(--sp-04);
    font-size: var(--mo-fz-md);
    font-weight: var(--fz-weight-700);
    color: var(--color-main-gray);
      
      & > b { 
        font-weight: var(--fz-weight-870);
        color: var(--color-main-5);   
      }
`;

const CheckListBox = styled.div`
    display: flex;
    align-items: flex-start;
    gap: var(--sp-14);    
`;


const SurveyCheckList = ({ surveyData, selectedValues, onChange }) => {
  const { items } = surveyData;

  return (
    <ContentWrap>
      <div>
        <TopTitle>{surveyData.category}</TopTitle>
        <SelectListBox>
          <ul>
            {items.map((item, itemIdx) => (
              <li key={item.id}>
                <QuestionTitle>
                  <b>{item.num ?? itemIdx + 1}.</b> {item.question} 
                </QuestionTitle>
                <CheckListBox>
                  {item.options.map((option, optIdx) => {
                    const inputId = `${item.id}_${optIdx}`;
                    const checked = selectedValues[item.name]?.value === option.value;

                    return (
                      <div
                        key={inputId}
                        className="radio-selectbox"
                        data-style="chk-box"
                        data-direction="column"
                      >
                        <input
                          type="radio"
                          id={inputId}
                          name={item.name}
                          value={option.value}
                          checked={checked}
                          onClick={(e) => onChange(e, option.markVal)}
                          readOnly
                        />
                        <label htmlFor={inputId}>{option.label}</label>
                      </div>
                    );
                  })}
                </CheckListBox>
              </li>
            ))}
          </ul>
        </SelectListBox>
      </div>
    </ContentWrap>
  );
};



export default SurveyCheckList;