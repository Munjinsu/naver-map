import axios from 'axios';
import { SERVER_URL } from '../constants/url';
import CODE from '../constants/code';
import URL from '../constants/url';
import MSG from '../constants/message';
import { getDpAuthRefeshTokenSimple, getLoadingHandler } from '../assets/js/comm';

// 김하용, axios 기본 베이스 인스턴스 생성
const instance = axios.create({
    baseURL: SERVER_URL
    , headers : {
        'Content-type': 'application/json'
    }
    , withCredentials: true
});

// 김하용, 고정 인터셉트 전처리 // Request Config (options) 을
instance.interceptors.request.use(
    (options) => {
      if (!options['noLoading']) {
          const setLoading = getLoadingHandler();
          if (setLoading) setLoading(true); // 전역 로딩셋
      }

      if(options['baseURL'] === SERVER_URL) {
          if (!options['origin']) {
              options = { ...options, origin: SERVER_URL };
          }
      }
      /* 김하용, default 는 변경하지 않도록 한다.
      else {
        //instance.defaults.baseURL = options.baseURL;
        //instance.defaults.origin = options.baseURL;
        //instance.defaults.withCredentials = true;
      }
      */
      return options;
    },
  (error) => {
      const setLoading = getLoadingHandler();
      if( setLoading ) setLoading(false); // 전역 로딩해제
    return Promise.reject(error);
  }
);

// 김하용, 고정 인터셉트 후처리
instance.interceptors.response.use(
    // 정상인 경우 그대로 돌려줌
   (resp) => {
       if (!resp.config?.noLoading) {
           const setLoading = getLoadingHandler();
           if (setLoading) setLoading(false);
       }
       if ( Number(resp.data.resultCode) === Number(CODE.RCV_ERROR_AUTH) ) { // 인증오류일경우, 사용자 정보 비우고, 로그인 화면으로
           alert(MSG.ERR_SESSION); //index.jsx라우터파일에 jwtAuthentication 함수로 공통 인증을 사용하는 코드 추가
           localStorage.setItem('jToken', "");
           sessionStorage.setItem("loginUser", JSON.stringify({}));
           //sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
           window.location.href = URL.LOGINMAIN;
           return false;
       } else {
           return resp;
       }
   },
   async (error) => {
       if (!error.config?.noLoading) {
           const setLoading = getLoadingHandler();
           if (setLoading) setLoading(false);
       }
       const originalRequest = error.config; // error 가 발생 한 요청 URL
       console.log( "============> intercept error request : ", originalRequest);
       if(error.code === "ERR_NETWORK") {
           alert(MSG.ERR_NETWORK);
       }

       // 인증서버의 로그인실패시는 사용하지 않음(해당 url은 로그인과 사용자 신규등록에서만 쓰임)// 동일한 에러를 발생시켜 식별할 수 없어 url 로 구분!!
       if (error.config.baseURL.indexOf("auth-cmccareplus.cmcnu.or.kr") < 0 ) {

          //발생사유 1. 만료된 엑세스토큰을 서버에 요청하다 발생 할수 있음.  2. 인증오류
          if(error.response.status === Number(CODE.RCV_BAD_UNAUTH)) {
              originalRequest._retry = true;
              const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
              if (loginUser.usrUid !== undefined && loginUser.usrUid !== "") {
                  if (loginUser.crtfcTknVal !== undefined && loginUser.crtfcTknVal !== null && loginUser.crtfcTknVal !== "") {
                      //await getDpAuthRefeshToken(loginUser.crtfcTknVal); //상세 처리 버전 // originalRequest 넘겨 처리해야함.
                      await  getDpAuthRefeshTokenSimple(loginUser.crtfcTknVal) // 간소화 버전 처리
                          .then( (data) => {
                              const { accessToken, refreshToken } = data;
                              localStorage.setItem("jToken", accessToken);
                              const requestRefreshUrl = SERVER_URL+"/signup/saveRefreshToken";

                              const userReq = {
                                  crtfcTknVal : refreshToken
                                  , usrInfoId: loginUser.usrInfoId
                                  , usrUid : loginUser.usrUid
                              }
                              const requestOptions = {
                                  headers: {
                                      Authorization: `Bearer ${accessToken}`,
                                  }
                                  , withCredentials: true
                              }
                              axios.post(requestRefreshUrl, userReq, requestOptions)
                                  .then( (resp) => {
                                      if(Number(resp.data.resultCode) === Number(CODE.RCV_SUCCESS)) {
                                          localStorage.setItem("jToken", accessToken);
                                          sessionStorage.setItem("loginUser", JSON.stringify(resp.data.result.userInfo));
                                          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                                          return axios(originalRequest);
                                      } else {
                                          alert("리프레쉬 토큰 업데이트에 실패하였습니다.");
                                          localStorage.setItem("jToken", "");
                                          sessionStorage.setItem("loginUser", JSON.stringify({}));
                                          //sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
                                          window.location.href = URL.LOGIN;
                                      }
                                  })
                                  .catch((err)=>{
                                      console.log(err);
                                      alert("인증정보 업데이트에 실패하였습니다.");
                                      localStorage.setItem("jToken", "");
                                      sessionStorage.setItem("loginUser", JSON.stringify({}));
                                      //sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
                                      window.location.href = URL.LOGIN;
                                  });
                          })
                          .catch(err => { console.log(err);
                              alert('인증정보를 가져오지 못했습니다.');
                              localStorage.setItem("jToken", "");
                              sessionStorage.setItem("loginUser", JSON.stringify({}));
                              //sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
                              window.location.href = URL.LOGIN;
                              //return false;
                          });
                  } else {
                      console.log( " ============= RCV_ERROR_SESSION ::: no_crtfcTknVal ");
                      // 김하용, 실제 리프레쉬 토큰 미확인시 염두해두고 만든 로직임~!! 참조.
                      alert(MSG.ERR_SESSION); //index.jsx라우터파일에 jwtAuthentication 함수로 공통 인증을 사용하는 코드 추가
                      localStorage.setItem("jToken", "");
                      sessionStorage.setItem("loginUser", JSON.stringify({}));
                      //sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
                      window.location.href = URL.LOGIN;
                      //return false;
                  }
              } else {
                  return false;
              }
          }
       }
       // 오류 응답을 처리
       return Promise.reject(error);
   }
);

export default instance;
