// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

// const PrivateRoute = () => {
//   const { authChecked, isLogin } = useAuth();

//   if (!authChecked)  return null;                           // 인증 확인 중 → 아무 것도 렌더링 안 함
//   if (!isLogin)      return <Navigate to="/login" replace/>; // 인증 실패 → 로그인으로 리다이렉트
//   return <Outlet />;                                        // 인증 성공 → 하위 라우트 렌더링
// };

// export default PrivateRoute;
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated }     from '../../utils/auth';
import URL                     from '../../constants/url';

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to={URL.LOGIN} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;