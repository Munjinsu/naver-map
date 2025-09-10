import React from "react";
import styled from 'styled-components';
import IconChkMark from '../../images/common/i_check_mark_on.svg'


const ChkBox = styled.div`
    display: flex;
    & input[type="checkbox"] {
        visibility: hidden; 
        border: 0; 
        width: 1px; 
        height: 1px; 
        background-color: transparent;
    }
    & input[type="checkbox"] + label {
        display: flex; 
        align-items: center; 
        justify-content: center; 
        height: var(--sp-32);  
        padding: 0 var(--sp-12); 
        border-radius: var(--radius-20);
        background-color: var(--color-main-gray-45); 
        transition: .4s;
    }
    & input[type="checkbox"]:checked + label {
        background-color: var(--color-main-15);
    }
    & input[type="checkbox"]:checked + label span {
        font-weight: var(--fz-weight-700);
        color: var(--color-main-5);
    }
    & input[type="checkbox"]:checked + label span::after {
        content: ""; 
        width: var(--sp-14); 
        height: var(--sp-14); 
        background: url(${IconChkMark}) no-repeat center; 
        background-size: contain;
    }
`;

const ChkBoxSpan = styled.span`
    display: flex; 
    align-items: center; 
    justify-content: space-between; 
    gap: var(--sp-04); 
    font-size: var(--mo-fz-smd); 
    color: var(--color-main-gray); 
    transition: .4s;
    &::after {
        content: "+"; 
        display: flex; 
        align-items: center; 
        width: var(--sp-14); 
        height: var(--sp-14);
        padding-bottom: 3px; 
        font-size: var(--mo-fz-xlg); 
        color: var(--color-main-gray-20); 
        font-weight: var(--fz-weight-400);
    }
`;

const CheckBoxCustom = ({ chkName, name, num }) => {
    
    return (
        <>
            <ChkBox>
                <input type="checkbox" id={`chk-${num}`} name={chkName} />
                <label htmlFor={`chk-${num}`}>
                    <ChkBoxSpan>{name}</ChkBoxSpan>
                </label>
            </ChkBox>
        </>
    );
};

export default CheckBoxCustom;
