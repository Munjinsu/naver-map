import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import imgHospital from '../../images/user/i_3d_hospital.svg';
import MyMedicalInformLoadBox from './MyMedicalInformLoadBox';
import URL from '../../constants/url';
import { useNavigate } from "react-router-dom";



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


const EmptyContentBox = ({target}) => {

  const navigate = useNavigate();

  const [status, setStatus]= useState(0);

  const landingLink = () => {
    setStatus(1);
  }  

  return (

    <>
        {status == 0 ? (
        <EmptyBox>
          <ImgBox> 
            <object data={imgHospital}/>
          </ImgBox>
          <Title>아직 연결된 성모병원이 없습니다.</Title>
            <SubTitle>내가 내원하는 성모병원을 연결 후 <br />
                서비스 사용이 가능합니다.  
            </SubTitle>
             <button className='btn' data-btn-type="fill-main" data-btn-size="smd" data-btn-icon='arrow'>
              <span> 병원 연결 바로가기 </span>  
            </button>
        </EmptyBox>       
        ) : <MyMedicalInformLoadBox />}
    </>
    
  ); 
};

export default EmptyContentBox;
