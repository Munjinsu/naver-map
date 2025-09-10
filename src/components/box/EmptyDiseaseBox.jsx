import React, { useState } from 'react';
import styled from 'styled-components';
import imgNoData from '../../images/common/i_3d_no_data_doc.svg';
import MyMedicalInformLoadBox from './MyMedicalInformLoadBox';
import { useNavigate } from "react-router-dom";
import URL from '../../constants/url';



const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-size: 60px 60px;
  text-align: center;
  & button {
    margin-top: var(--sp-12);
  }
`;

const ImgBox = styled.div`
  width: var(--sp-62);
  height: var(--sp-62);
  & object {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.strong`
  padding-top: var(--sp-10);
  font-size: var(--mo-fz-md);
  color: var(--color-main-gray-5);
  font-weight: var(--fz-weight-700);
`;

const SubTitle = styled.p`
padding-top: var(--sp-12);
  font-size: var(--mo-fz-smd);
  color: var(--color-main-gray-5);
`;


const EmptyDiseaseBox = () => {

  const navigate = useNavigate();

  const [status, setStatus]= useState(0);

  const landingLink = () => {
    setStatus(1);
  }  

  return (

    <>
        <EmptyBox>
          <ImgBox> 
            <object data={imgNoData}/>
          </ImgBox>
          <Title>설정된 질환 정보가 없습니다.</Title>
            <SubTitle>내 질환 정보를 설정하고 <br />
                      성모병원 전문 의료인이 작성한 <br />
                      맞춤 질환 정보를 확인해보세요!
            </SubTitle>
             <button 
              className='btn'
              data-btn-type="fill-main" 
              data-btn-size="smd" 
              data-btn-icon='arrow'
              onClick={() => navigate(URL.DISEASE_SETTING)}
              >
              <span> 질환 설정 바로가기 </span>  
            </button>
        </EmptyBox>       
    </>
    
  ); 
};

export default EmptyDiseaseBox;
