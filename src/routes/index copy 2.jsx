import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';


import PharmacyFind from '../pages/map/PharmacyFind'; // 처방전 확인하기 > 근처 약국 찾기



const RootRoutes = () => {


  return (
    <>
     
      <Routes>
        {/* 공개 페이지 */}
        <Route path="/map" element={<PharmacyFind />} />

        {/* 그 외 URI는 무조건 로그인으로 */}
        
      </Routes>
    </>
  );
};

export default RootRoutes;
