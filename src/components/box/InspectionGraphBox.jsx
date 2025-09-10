import React from 'react';
import styled from 'styled-components';
import LineChart from '../../components/charts/LineChart';
import imgCloseBtn from '../../images/common/i_close_btn.svg';


// 병원 케어 > 검사 내역 > 검사 결과 > 상세 그래프 


const SAMPLE_DATA = [
    {  prscrptnTestRsltDate: "20161004",  prscrptnTestRsltVal: 0.65,  unit: "mg/dL"},
    {  prscrptnTestRsltDate: "20161005",  prscrptnTestRsltVal: 0,  unit: "mg/dL"},
    {  prscrptnTestRsltDate: "20181028",  prscrptnTestRsltVal: 0.7,  unit: "mg/dL"},
    {  prscrptnTestRsltDate: "20201007",  prscrptnTestRsltVal: 0.5,  unit: "mg/dL"},
    { prscrptnTestRsltDate: "20201008",  prscrptnTestRsltVal: 0.4,  unit: "mg/dL"},
  ];

  const SAMPLE_RANGE = [0.5, 0]  


//style
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
        background: url(${imgCloseBtn}) no-repeat center;
        background-size: 100%;
    }
`;

const ContentBox = styled.div`
    overflow: visible
    display: block;
    width: 100%;
    height: 200px;
    margin-top: var(--sp-12);
`;


const LegendBox = styled.div`
    display: block;
    width: 100%;
    margin-top: var(--sp-24);
    & ul {
        display: flex;
        align-items: center;
        justify-content: center;
        gap:var(--sp-20);
        & li {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--mo-fz-sm);
            color:var(--color-main-gray);
            font-weight: 700; 

            &:before {
                content:" ";
                display: block;
                width: var(--sp-12);
                height: 1px;
                margin-right: var(--sp-08);
                background-color: #46AF83;
             }
        }
        
        & li[data-legend="2"]::before {
            background-color: #E55151;
        }
        & li[data-legend="3"]::before {
            height: 4px;
            background-color: #3284FF;
        }
    }
        
`;



const InspectionGraphBox = ({onClose, title = '', data = [], range = []}) => {
    console.log(data)
    console.log(range)
    return (
        <ContentWrap>
            <InnerBox>
                <strong>
                    {title}
                </strong>
                <LegendBox>
                    <ul>
                        <li data-legend="1">참고치(상한)</li>
                        <li data-legend="2">참고치(하한)</li>
                        <li data-legend="3">결과</li>
                    </ul>

                </LegendBox>

                <ContentBox>

                    <LineChart data={data.length > 0 ? data : SAMPLE_DATA} _range={range.length > 0 ? range : SAMPLE_RANGE} />
                    {/* <GraphBox></GraphBox> */}
                   
                </ContentBox>

                
                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default InspectionGraphBox;