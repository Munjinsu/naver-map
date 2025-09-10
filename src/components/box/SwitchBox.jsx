import React ,{useState} from 'react';
import styled from 'styled-components';



const ToggleBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'toggles'
})`
  width: 32px;
  height: 16px;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  background-color: ${({toggles}) => (toggles ? "#3284FF" : "#C4C8CE")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.25s ease-in-out;
  &.small {
    width: 26.67px;
    height: 13.33px;
    & .small {
    width: 10.67px;
    height: 10.67px;
    ${({toggles}) => toggles && "transform: translate(13.33px, 0);"}
  }
  &:disabled {
    opacity: 0.7
  } 
`;
const Circle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'toggles'
})`
  background-color: white;
  width: 12.8px;
  height: 12.8px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.25s ease-in-out;
  ${({toggles}) => toggles && "transform: translate(16px, 0);"}
`;


const SwitchBox = ({ toggles, status, size, disabled = false }) => {
  const handleClick = () => {
    if (!disabled && status) {
      status(!toggles);
    }
  };

  return (
    <ToggleBtn
      toggles={toggles}
      onClick={handleClick}
      className={size}
      disabled={disabled}
    >
      <Circle toggles={toggles} className={size} />
    </ToggleBtn>
  );
};

export default SwitchBox;