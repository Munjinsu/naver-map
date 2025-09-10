import React from 'react';
import styled from 'styled-components';
import imgNetworkError from '../../images/common/img_network_error.svg';



const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  text-align: center;
  & button {
    margin-top: var(--sp-12);
  }
`;

const ImgBox = styled.div`
  width: 14rem;
  height: 14rem;
  & object {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.strong`
  padding-top: var(--sp-10);
  font-size: var(--mo-fz-md);
  color: var(--color-main-gray);
  font-weight: var(--fz-weight-700);
`;



const NetworkErrorBox = () => {

  const handleRefresh = () => {
    window.location.reload();
  };
 
  return (
    <>
        <ErrorBox>
          <ImgBox> 
            <object data={imgNetworkError}/>
          </ImgBox>
          <Title>앗, 화면을 불러오지 못했어요!</Title>
            
             <button className='btn' data-btn-type="fill-main" data-btn-size="smd" data-btn-icon='refresh' onClick={handleRefresh}>
              <span> 새로고침 </span>  
            </button>
        </ErrorBox> 
    </>
    
  ); 
};

export default NetworkErrorBox;
