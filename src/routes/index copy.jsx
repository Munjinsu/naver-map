import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Navigate, Routes, Route, useLocation } from 'react-router-dom';

import CODE from '../constants/code';
import URL from '../constants/url';

import axiosApi from '../api/daonAxios';

//COMMON
import Header from '../components/header/Header';
import SiderBar from '../components/sideBar/SiderBar';
import Footer from "../components/footer/Footer";
import ErrorPage from "../components/error/ErrorPage";
import LoginPage from '../pages/login/main/LoginPage';


// 콘텐츠 발송
import SendManual from '../pages/send/SendManual';
import SendHistory from '../pages/send/history/SendHistory'; 
import SendHistoryDetail from '../pages/send/history/SendHistoryDetail'; 

// 환자 관리
import PatientsCare from '../pages/patients/PatientsCare';

// 비대면 진료 관리

// 해외 환자 비대면 진료 관리

// 건강 기록 콘텐츠 관리
import BasicSurveys from '../pages/healthcont/BasicSurveys';
import BasicSurveysDetail from '../pages/healthcont/BasicSurveysDetail';
import HealthSetManage from '../pages/healthcont/HealthSetManage';
import HealthSetRegist from '../pages/healthcont/HealthSetRegist';

// 재택 치료 가이드 콘텐츠 관리
import TreatmentGuide from '../pages/homecont/TreatmentGuide';
import TreatmentRegist from '../pages/homecont/TreatmentRegist';
import TreatmentDetail from '../pages/homecont/TreatmentDetail';
import GuideSetMngt from '../pages/homecont/GuideSetMngt';
import GuideSetRegist from '../pages/homecont/GuideSetRegist';
import GuideSetDetail from '../pages/homecont/GuideSetDetail';

// 공지사항
import Notice from '../pages/notice/Notice';
import NoticeDetail from '../pages/notice/NoticeDetail';

// 1:1 문의
import AskList from '../pages/ask/AskList';
import AskDetail from '../pages/ask/AskDetail';
import AskRegist from '../pages/ask/AskRegist';





const RootRoutes = () => {

  const user = sessionStorage.getItem("sessionUser");
  //useLocation객체를 이용하여 정규표현식을 사용한 /staff/~ 으로 시작하는 경로와 비교에 사용(아래 1줄) */}
  const location = useLocation();

  //리액트에서 사이트관리자에 접근하는 토큰값 위변조 방지용으로 서버에서 비교하는 함수 추가
  const jwtAuthentication = useCallback(() => {
    console.group("jwtAuthentication");
    console.log("[Start] jwtAuthentication ------------------------------");

    const jwtAuthURL = "/sighup/jwtAuthAPI";
    const jToken = localStorage.getItem('jToken');
    let requestOptions = {
      method: "POST",
      headers: {
        Authorization: jToken,
      },
    };

    axiosApi.post(jwtAuthURL, requestOptions, (resp) => {
      console.log( " ==============> jwtAuthentication resp : ", resp );

      if (resp === false) {
        setMounted(false);
      } else {
        setMounted(true); // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
      }
    });

    console.log("------------------------------jwtAuthentication [End]");
    console.groupEnd("jwtAuthentication");
  }, []);

  const sessionAuthentication = useCallback( () => {
    console.group('sessionAuthentication');
    console.log('[Start] sessionAuthentication ------------------------------');
    /*
        const sessionAuthURL = '/signup/sessionExtension';

        axiosApi.post(sessionAuthURL,(resp) => {
          console.log(' ==============> sessionAuthentication resp : ', resp);

          if (resp === false) {
            setMounted(false);
          } else {
            setMounted(true); // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
          }
        });
    */
    console.log('------------------------------sessionAuthentication [End]');
    console.groupEnd('sessionAuthentication');
  }, []);

  //시스템관리 메뉴인 /staff/으로 시작하는 URL은 모두 로그인이 필요하도록 코드추가(아래)
  const isMounted = useRef(false); // 아래 로그인 이동 부분이 2번 실행되지 않도록 즉, 마운트 될 때만 실행되도록 변수 생성
  const [mounted, setMounted] = useState(false);// 컴포넌트 최초 마운트 후 리렌더링 전 로그인 페이지로 이동하는 조건으로 사용

  useEffect(() => {

    //jwtAuthentication();
	    if (!isMounted.current) { // 컴포넌트 최초 마운트 시 페이지 진입 전(렌더링 전) 실행
	    	isMounted.current = true; // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
	    	setMounted(true); // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
	    	const regex = /^(\/staff\/)+(.)*$/; //정규표현식 사용: /staff/~ 으로 시작하는 경로 모두 포함
	    	if(regex.test(location.pathname)) {
	    		setMounted(false); // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용. 기본은 숨기기
	    		//jwtAuthentication(); // 이 함수에서 관리자단 인증여부 확인 후 렌더링 처리
	    	}
	    }

    if(user) {
      sessionAuthentication();
    }
  },[jwtAuthentication, location, mounted]); // location 경로와 페이지 마운트상태가 변경 될 때 업데이트 후 리렌더링

  if(mounted) { // 인증 없이 시스템관리 URL로 접근할 때 렌더링 되는 것을 방지하는 조건추가.
	  return (
	      <Routes>
	        <Route path={URL.ERROR} element={<ErrorPage />} />
	        <Route path="*" element={<SecondRoutes/>} />
	      </Routes>
	  )
  }
}

const SecondRoutes = () => {

  const location = useLocation();

  const apiReqAt = location.pathname.indexOf("api/") > -1
      || location.pathname.indexOf("-api") > -1;

  const [loginVO, setLoginVO] = useState({});

  //useRef객체를 사용하여 페이지 마운트 된 후 ui.js를 로딩 하도록 변경 코드 추가(아래)
  const isMounted = useRef(false); // 아래 로그인 이동 부분이 2번 실행되지 않도록 즉, 마운트 될 때만 실행되도록 변수 생성
  useEffect(() => {
    if (!isMounted.current) { // 컴포넌트 최초 마운트 시 페이지 진입 전(렌더링 전) 실행
		isMounted.current = true; // 이 값으로 true 일 때만 페이지를 렌더링이 되는 변수 사용.
	}else{
		//initPage();
	}
  },[]);

  return (
    <>
    { !apiReqAt && location.pathname !== URL.MAIN && location.pathname !== URL.LOGIN &&  // 로그인 페이지 제외 
      <Header loginUser={loginVO} onChangeLogin={(user) => setLoginVO(user)} />
    }
    { location.pathname !== URL.MAIN && location.pathname !== URL.LOGIN &&  // 로그인 페이지 제외 
      <SiderBar />
    }
      <Routes>
        {/* MAIN */}
        <Route path={URL.MAIN} element={<LoginPage />} />

        {/* LOGIN */}
        <Route path={URL.LOGIN} element={<LoginPage />} />

        {/* ERROR */}
        <Route path={URL.ERROR} element={<ErrorPage />} />

        {/* 콘텐츠 발송 */}
        <Route path={URL.SEND_MANUAL} element={<SendManual />} />
        <Route path={URL.SEND_HISTORY} element={<SendHistory />} />
        <Route path={URL.SEND_HISTORY_DETAIL} element={<SendHistoryDetail />} />

        {/* 환자 관리 */}
        <Route path={URL.PATIENTS_CARE} element={<PatientsCare />} />

        {/* 비대면 진료 관리 */}

        {/* 해외 환자 비대면 진료 관리 */}
        
        {/* 건강 기록 콘텐츠 관리 */}
        <Route path={URL.BASIC_SURVEYS} element={<BasicSurveys />} />
        <Route path={URL.BASIC_SURVEYS_DETAIL} element={<BasicSurveysDetail />} />
        <Route path={URL.HEALTH_SET_MANAGE} element={<HealthSetManage />} />
        <Route path={URL.HEALTH_SET_REGIST} element={<HealthSetRegist />} />

        {/* 재택 치료 가이드 콘텐츠 관리 */}
        <Route path={URL.TREATMENT_GUIDE} element={<TreatmentGuide />} />
        <Route path={URL.TREATMENT_REGIST} element={<TreatmentRegist />} />
        <Route path={URL.TREATMENT_DETAIL} element={<TreatmentDetail />} />
        <Route path={URL.GUIDE_SET_MNGT} element={<GuideSetMngt />} />
        <Route path={URL.GUIDE_SET_REGIST} element={<GuideSetRegist />} />
        <Route path={URL.GUIDE_SET_DETAIL} element={<GuideSetDetail />} />

        {/* 공지사항 */}
        <Route path={URL.NOTICE} element={<Notice />} />
        <Route path={URL.NOTICE_DETAIL} element={<NoticeDetail />} />

        {/* 1:1 문의 */}
        <Route path={URL.ASK_LIST} element={<AskList />} />
        <Route path={URL.ASK_DETAIL} element={<AskDetail />} />
        <Route path={URL.ASK_REGIST} element={<AskRegist />} />

      </Routes>
      {/* { !apiReqAt &&
      <Footer />
      } */}
    </>
  )

}


export default RootRoutes;
