import React from 'react';
import RangeSliderBox from '../../components/box/RangeSliderBox';
import styled from 'styled-components';



// 설문지 척도 컨퍼넌트
const ContentWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: var(--sp-52);
`;

const QuestionTitle = styled.p`
    font-size: var(--mo-fz-md);
    font-weight: var(--fz-weight-400);
    color: var(--color-main-gray);
    white-space: pre-wrap;
    text-align: center;
    & strong {
        font-weight: var(--fz-weight-700);
        color: var(--color-main-black);
    }
`;

const SliderBox = styled.div`
    display: block;
    width: 100%;
    & .step-type-box-a {
        width: 100%;
    }
`;



const SurveyScale = ({surveyData, selectedValue, onChange, step }) => {
    const { question, name } = surveyData;

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
            <QuestionTitle>
                <BoldText text={question} />
            </QuestionTitle>
            
            <SliderBox>
            <div className='step-type-box-a'>
                <div className='slider-wrap'>
                    <RangeSliderBox 
                        value={selectedValue !== undefined ? Number(selectedValue.value) : 0}
                        onChange={(val) => {
                            onChange({ target: { type: 'scale' } }, val, name);
                        }}
                        maxValue={8}
                    />
                </div>
            </div>
            </SliderBox>
            
         </ContentWrap>
    );
};

export default SurveyScale;
