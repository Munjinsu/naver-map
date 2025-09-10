import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import URL from "../../constants/url";
import imgMydata from '../../images/common/img_my_data.svg';


const MyDataBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top:0;
  bottom:0; 
  z-index:-1;
  width: 100%;
  height: 100%;
  padding: var(--sp-16);
  text-align: center;
  & button {
    margin-top: var(--sp-12);
  }
`;

const ImgBox = styled.div`
  width: 24rem;
  height: 27.5rem;
  & img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.div`
  & p {
    font-size: var(--mo-fz-md);
    color: var(--color-main-gray);
  } & b 
    {
      font-weight: var(--fz-weight-700);
    }
`;

const SpanBox = styled.p`
  padding-top: var(--sp-12);
  font-size: var(--mo-fz-smd);
  color: var(--color-main-5);
  font-weight: var(--fz-weight-700);
`;


const MyMedicalInformLoadBox = () => {

  const navigate = useNavigate();


  return (
    <MyDataBox className='animation-3'>

      <Title>
          <p> 여러 병원에 흩어져 있는 </p>
          <p><b>내 의료 정보</b> 들을 </p>
          <p><b>한 곳에서 쉽고 편리하게</b> 관리하세요!</p>  
      </Title>
        
      <ImgBox> 
        <img src={imgMydata}/>
      </ImgBox>

        <SpanBox>약 30초 소요!</SpanBox>
        <button className='btn' data-btn-type="fill-main" data-btn-size="lg" data-btn-width='full' onClick={()=> navigate(URL.MY_DATA_COLLECT)}>
          <span> 내 의료 정보 모으기 </span>  
        </button>
    </MyDataBox>       
  );
};

export default MyMedicalInformLoadBox;
