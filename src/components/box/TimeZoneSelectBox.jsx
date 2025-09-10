import React, { useState } from 'react';
import styled from 'styled-components';
import imgSelectArrow from '../../images/common/i_select_arrow.svg';

const SelectBox = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 22rem;
    height: 2.8rem;
    padding: 8px;
    /*border: 1px solid var(--color-main-gray-30);*/
    box-shadow: 0 0 0 1px var(--color-main-gray-30);
    border-radius: var(--radius-8);
    background-color: #ffffff;
    align-self: center;
    cursor: pointer;
    box-sizing: border-box;
    
    &::before {
        content: '';
        position: absolute;
        top: 4px;
        right: 8px;
        width: 16px;
        height: 16px;
        background-image: url(${imgSelectArrow});
        transform: rotate(0);
        transform-origin: center;
        transition: transform 0.45s;
    }
    &.on {
        border-bottom: 0;
        border-radius: var(--radius-8) var(--radius-8) 0 0;
    }
    &.on::before {
        transform: rotate(180deg);
    }
`;
const Label = styled.label`
    font-size: 14px;
    margin-left: 4px;
    text-align: center;
`;

const ScrollBox = styled.div`
    will-change: max-height;
    overflow: auto;
    position: absolute;
    z-index: 20;
    list-style: none;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: ${(props) => (props.show ? '15.8rem' : '0')};
    box-shadow: ${(props) =>
       props.show
        ? `
        0 1px 0 var(--color-main-gray-30),   /* 아래쪽 얇은 선 */
        1px 0 0 var(--color-main-gray-30),   /* 오른쪽 선 */
        -1px 0 0 var(--color-main-gray-30)    /* 왼쪽 선 */
        ` : 'none'};
    border-radius: 0 0 var(--radius-8) var(--radius-8);
    background-color: var(--color-white);
    font-size: var(--mo-fz-smd);
    color: var(--color-black);
    box-sizing: border-box;
    transition: 0.25s;
    transform: none;
    -webkit-backface-visibility: visible;
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};

    
    &::-webkit-scrollbar {
        width: 20px;
        height: 3px;
    }
    &::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #e2e6ec;
        border-radius: 10px;
        border: 7px solid #fff;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.2);
    }
`;

const SelectOptions = styled.ul``;

const Option = styled.li`
    font-size: 14px;
    padding: 5px 12px;
    white-space: nowrap;
`;

//샘플 데이터
const optionData = [
    'Eastern Time (UTC - 5:00)',
    'Eastern Time (UTC - 5:10)',
    'Eastern Time (UTC - 5:20)',
    'Eastern Time (UTC - 5:30)',
    'Eastern Time (UTC - 5:40)',
    'Eastern Time (UTC - 5:50)',
    'Eastern Time (UTC - 5:60)',
    'Eastern Time (UTC - 5:70)',
    
];

const TimeZoneSelectBox = ({ type }) => {
    const [currentValue, setCurrentValue] = useState(optionData[0]);
    const [isShowOptions, setShowOptions] = useState(false);

    const handleOnChangeSelectValue = (e) => {
        setCurrentValue(e.target.getAttribute('value'));
    };

    return (
        <>
            <SelectBox
                onClick={() => setShowOptions((prev) => !prev)}
                className={isShowOptions ? 'on' : null}
            >
                <Label>{currentValue}</Label>

                <ScrollBox show={isShowOptions}>
                    <SelectOptions>
                        {optionData.map((data) => (
                            <Option
                                key={data.key}
                                value={data}
                                onClick={handleOnChangeSelectValue}
                            >
                                {data}
                            </Option>
                        ))}
                    </SelectOptions>
                </ScrollBox>
            </SelectBox>
        </>
    );
};

export default TimeZoneSelectBox;
