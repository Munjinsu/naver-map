import React ,{useEffect, useState} from 'react';
import styled from 'styled-components';
import imgSelectArrow from '../../images/common/i_select_arrow.svg';


const SelectBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 9.6rem;
  height: 2.8rem;
  padding: 8px;
  /*border:1px solid var(--color-main-gray-30);*/
  box-shadow: 0 0 0 1px var(--color-main-gray-30);
  border-radius: var(--radius-8);
  background-color: #ffffff;
  align-self: center;
  cursor: pointer;
  box-sizing: border-box;
  &::before {
    content: "";
    position: absolute;
    top: 4px;
    right: 8px;
    width: 16px;
    height: 16px;
    background-image: url(${imgSelectArrow});
    transform: rotate(0);
    transform-origin: center;
    transition: transform .45s;
  }
  &.on {
    border-bottom: none;
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
  overflow: auto;  
  position: absolute;
  list-style: none;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: ${(props) => (props.show ? "17.8rem" : "0")};
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
  box-sizing: content-box;
  transition: .25s;
  transform: none;
    -webkit-backface-visibility: visible;
  &::-webkit-scrollbar {width: 20px; height: 3px;} 
  &::-webkit-scrollbar-track {background: #fff; border-radius: 10px;}
  &::-webkit-scrollbar-thumb {background: #E2E6EC; border-radius: 10px; border: 7px solid #fff;}
  &::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, .2);}
`;

const SelectOptions = styled.ul`
`;


const Option = styled.li`
  font-size: 14px;
  padding: 5px 12px;
  white-space: nowrap;
`;

//샘플 데이터
// const optionData = ["25.04.01", "25.04.02", "25.04.03","25.04.04" ,"25.04.04","25.04.04","25.04.04","25.04.04"];

const CustomSelectBox = ({optionData, onChage}) => {
  const [currentValue, setCurrentValue] = useState();
  const [isShowOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setCurrentValue(optionData.length > 0 ? optionData[0] : []);
  },[optionData])

  const handleOnChangeSelectValue = (item) => {
    setCurrentValue(item);
    onChage(item.value);
  };

  const formatDate = (strDate) => {
    if (!strDate || strDate.length !== 8) return strDate; 
    return `${strDate.slice(2,4)}.${strDate.slice(4,6)}.${strDate.slice(6,8)}`;
  }

  return (
    <>
      <SelectBox onClick={() => setShowOptions((prev) => !prev)} className={isShowOptions ? "on" : null}>
        <Label>{currentValue ? formatDate(currentValue.label) : ''}</Label>
        
          <ScrollBox show={isShowOptions}>
            <SelectOptions> 
              {optionData && optionData.map((item, idx) => (
                <Option
                  key={'option_' + idx}
                  value={item.value}
                  onClick={() => handleOnChangeSelectValue(item)}
                >
                  {formatDate(item.label)}
                </Option>
              ))}
            </SelectOptions>
          </ScrollBox>
      </SelectBox>
    </>
  )   
}

export default CustomSelectBox;