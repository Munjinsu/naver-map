import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PharmacyFind from '../pages/map/PharmacyFind';

const RootRoutes = () => {
  return (
    <Routes>
      {/* 공개 페이지 */}
      <Route path="/map" element={<PharmacyFind />} />

      {/* TODO: 로그인 페이지나 기본 Redirect 처리 */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  );
};

export default RootRoutes;
