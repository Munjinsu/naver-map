import {isEqual} from "lodash";
import { useCallback } from 'react';
import MSG from "../../constants/message";
import $ from "jquery";
import { useLocation, useNavigate } from 'react-router-dom';
import URL, { DPAUTH_APIKEY, DPAUTH_URL, DPMSG_APIKEY } from '../../constants/url';
import * as XLSX from 'xlsx';
import axiosApi from '../../api/daonAxios';
import CODE from '../../constants/code';

const today = new Date();

/**
 * 현재날짜 스트링값으로 받아오기
 * @returns
 */
const getDateString = () => {
    const yyyy = today.getFullYear().toString();
    const MM = lpad(today.getMonth() + 1, '0', 2);
    const dd = lpad(today.getDate(), '0', 2);
    const hh = lpad(today.getHours(), '0', 2);
    const mm = lpad(today.getMinutes(), '0', 2);
    const ss = lpad(today.getSeconds(), '0', 2);
    return yyyy+MM+dd+hh+mm+ss;
};

/**
 * 왼쪽으로 자릿수만큼 문자열 붙이기
 * @param value
 * @param char
 * @param length
 * @returns {string}
 */
const lpad = (value, char, length) => {
    let str = "" + value;
    while (str.length < length) {
        str =  char + str;
    }
    return str;
};

/**
 * 오른쪽으로 자릿수만큼 문자열 붙이기
 * @param value
 * @param char
 * @param length
 * @returns {string}
 */
const rpad = (value, char, length) => {
    let str = "" + value;
    while (str.length < length) {
        str = str + char;
    }
    return str;
};

/**
 * 화면 리로드 함수
 */
const screenReload = () => {
    setTimeout(function(){
        window.location.reload();
    }, 0);
};

/**
 * DP인증서버 사용자 아이디 존재여부
 * @param userId
 * @returns {Promise<axios.AxiosResponse<any>>}
 *  true | false
 */
const getIsDpAuthUserId = (userId) => {

    const requestIsUserIdUrl = "/auth/pwd/user-state/username";
    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'text/plain'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestIsUserIdUrl, userId, requestOptions)
        .then((res) => res.data )
        .catch(err => {
            console.error( err );
            //alert(MSG.ERR_AUTH);
            throw err;
        });
};

/**
 * DP인증서버 사용자 회원가입
 * @param signUser
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const setDpAuthSignup = (signUser) => {
    const requestSignupUrl = "/auth/pwd/signup";

    const requestParams = {
        username : signUser.usrId
        , password : signUser.usrPswd
        , displayName: signUser.usrNm
        , phoneNumber: signUser.mblNo
        , birth: signUser.brthdy
        , gender: signUser.gendr
        , initRePwd: false
    }

    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestSignupUrl, requestParams, requestOptions)
        .then((res) => res.data )
        .catch(err => {
            console.error( err );
            //alert(MSG.ERR_AUTH);
            throw err;
        });
};


/**
 * DP인증서버 사용자 아이디 찾기
 * @param findUser
 *   displayName : usrNm, // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   phoneNumber : mblNo,  // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   authNumber : authNumber,
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getDpFindUserId = (findUser) => {

    const requestFindUserIdUrl = "/auth/pwd/username";

    const requestParams = {
        displayName: findUser.usrNm
        , phoneNumber: findUser.mblNo
        , authNumber: findUser.authNumber
    }

    const requestOption = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params: {
            apiKey: DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestFindUserIdUrl, requestParams, requestOption)
        .then((res) => res.data )
        .catch(err => {
            throw err
        });
};

/**
 * DP인증서버 사용자 패스워드 변경
 * @param json authInfo {
 *   username : usrId, // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   displayName : usrNm, // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   phoneNumber : mblNo,  // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   authNumber : authNumber, // 컴퍼넌트 입력
 *   newPassword : newPassword // 컴퍼넌트 입력
 * }
 */
const setDpAuthChangePassword = (authInfo, setData) => {

    const requestChangePasswordUrl = "/auth/pwd/reset-password";

    const requestParams = {
      username : authInfo.usrId
      , displayName : authInfo.usrNm
      , phoneNumber : authInfo.mblNo
      , authNumber : authInfo.authNo
      , newPassword : authInfo.newPswd
    }

    const requestOptions = {
        baseURL: DPAUTH_URL
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }

    axiosApi.post(requestChangePasswordUrl, requestParams, requestOptions)
      .then((res) => {
          console.log( " =========> setDpAuthChangePassword result : ", res );
          setData(res);
      }).catch((err) => {
        console.log(err);
        setData(err);
    });
};

/**
 * DP인증서버 로그인(토큰발급)
 * @param json loginUser
 * @param setJson setData
 */
const getDpAuthSignin = (loginUser) => {

    const requestSigninUrl = "/auth/pwd/signin";

    const requestParams = {
        username : loginUser.usrId
        , password : loginUser.usrPswd
    }

    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestSigninUrl, requestParams, requestOptions)
      .then((res) => res.data )
      .catch(err => {
          console.error( err );
          //alert(MSG.ERR_AUTH);
          throw err;
    });
};


/**
 * DP인증서버 인증 문자발송
 * @param json userInfo  ** 신규라면 json 형식에 아래항목에 직접 맞게 기술하여 보내도록 함
 *   displayName : usrNm, // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   phoneNumber : mblNo,  // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 * return response
 */
const getDpAuthSendSms = (userInfo) => {

    const requestSigninUrl = "/auth/sms";

    const requestParams = {
        displayName : userInfo.usrNm
        , phoneNumber : userInfo.mblNo
    }

    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestSigninUrl, requestParams, requestOptions)
        .then((res) => res.data )
        .catch(err => {
            console.error( err );
            throw err;
        });
};

/**
 * DP인증서버 인증 문자 확인
 * @param
 *   phoneNumber :  휴대전화번호
 *   authNumber  : 인증번호
 * return response
 */
const getDpAuthSmsCheck = (phoneNumber, authNumber) => {

    const requestSigninUrl = `/auth/sms/phone/${phoneNumber}/num/${authNumber}`;

    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.get(requestSigninUrl, requestOptions)
        .then((res) => res.data )
        .catch(err => {
            console.error( err );
            throw err;
        });
};


/**
 * DP인증서버 휴대폰 회원가입 및 로그인(로그인시 토큰발급)
 * @param json loginUser
 *   phoneNumber : mblNo, // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   authNumber : authNumber // << DP-AUTH
 *   displayName : usrNm // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   pushToken : crtfcTknVal // TC_USR_INFO 매핑
 */
const getDpAuthHpSignIn = (userInfo) => {

    const requestSigninUrl = "/auth/phone/signin";

    const requestParams = {
        phoneNumber : userInfo.mblNo
        , authNumber : userInfo.authNumber
        , displayName : userInfo.usrNm
        , pushToken : userInfo.crtfcTknVal
        , integrityCode : "dev"
    }

    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            // Authorization: `Bearer ${jToken}`,
            'Content-type': 'application/json'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestSigninUrl, requestParams, requestOptions)
        .then((res) => res.data )
        .catch(err => {
            console.error( err );
            //alert(MSG.ERR_AUTH);
            throw err;
        });
};


/**
 * DP인증서버 사용자 휴대폰번호 변경
 * @param findUser
 *   displayName : usrNm, // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   oldPhoneNumber : oldMblNo,  // TC_USR_INFO 매핑 <==> 컴퍼넌트 입력
 *   newPhoneNumber : newMblNo,
 *   authNumber : authNumber,
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const setDpChangePhoneNumber = (userInfo) => {

    const requestFindUserIdUrl = "/auth/pwd/change-phonenumber";

    const requestParams = {
        username : userInfo.usrId
        , oldPhoneNumber: userInfo.oldMblNo
        , newPhoneNumber: userInfo.newMblNo
        , authNumber: userInfo.authNumber
    }

    const requestOption = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params: {
            apiKey: DPAUTH_APIKEY
        }
        , withCredentials: false
    }
    return axiosApi.post(requestFindUserIdUrl, requestParams, requestOption)
        .then((res) => res.data )
        .catch(err => {
            throw err
        });
};

/**
 * 인증서버 리프레쉬 토큰 발급 간소화버전
 * @param String refreshToken
 * @param Function callBackFunc
 *   ㄴ callback 처리가 있는 경우, 메시지 생략 후 실행. 던질 callback 함수는 실행시킬 함수를 감싼후 던지도록 한다!!
 */
const getDpAuthRefeshTokenSimple = (refreshToken) => {

    const requestRefreshTokenUrl = "/auth/token/refresh";
    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            // Authorization: `Bearer ${jToken}`,
            'Content-type': 'application/json'
            //, 'X-Requested-With': 'XMLHttpRequest'
        }
        , params: {
            apiKey: DPAUTH_APIKEY
            , refreshToken: refreshToken
        }
        , withCredentials: false
    }

    return axiosApi.post(requestRefreshTokenUrl, {}, requestOptions)
        .then((res) => res.data )
        .catch(err => {
            console.error(err);
            //alert(MSG.ERR_AUTH);
            throw err;
        });
};

/**
 * 인증서버 리프레쉬 토큰 발급
 * @param String refreshToken
 * @param Function callBackFunc
 *   ㄴ callback 처리가 있는 경우, 메시지 생략 후 실행. 던질 callback 함수는 실행시킬 함수를 감싼후 던지도록 한다!!
 */
const getDpAuthRefeshToken = async (refreshToken, callBackFunc) => {

    const requestRefreshTokenUrl = "/auth/token/refresh";

    const requestOptions = {
        baseURL: DPAUTH_URL
        , headers: {
            'Content-type': 'application/json'
        }
        , params : {
            apiKey : DPAUTH_APIKEY
            , refreshToken : refreshToken
        }
        , withCredentials: false
    }

    await axiosApi.post(requestRefreshTokenUrl, {}, requestOptions)
      .then( async (res) => {

          //console.log( " =================> getDpAuthRefeshToken : ", res );
          const jToken = res.data.jToken;

          if( jToken !== undefined && jToken !== null && jToken !== "") {

              const requestaftcrUrl = "/signup/saveRefreshToken";

              const userReq = {
                  crtfcTknVal : res.data.refreshToken
              }
              await axiosApi.post(requestaftcrUrl, userReq)
                  .then( (resp) => {

                      if(Number(resp.data.resultCode) === Number(CODE.RCV_SUCCESS)) {
                          localStorage.setItem('jToken', jToken);
                          sessionStorage.setItem('loginUser', JSON.stringify(res.data.result.userInfo));
                          if (callBackFunc) { // callback 처리가 있는 경우, 메시지 생략 후 실행. 던질 callback 함수는 실행시킬 함수를 감싼후 던지도록 한다!!
                              callBackFunc();
                          } else {
                              alert("인증시간이 만료되어, 인증정보가 업데이트 되었습니다.\n진행하시던 업무를 다시 수행해주세요.");
                          }
                      }
                  })
                  .catch((err)=>{
                      console.log(err);
                      alert("인증정보 업데이트에 실패하였습니다.");
                  })

          } else {
              // 토큰정보를 획득하지 못한 경우 강제 로그아웃 시킨다.
              alert("토큰 정보를 획득하지 못했습니다!! \n로그아웃 처리 됩니다.");
              localStorage.setItem('jToken', '');
              sessionStorage.setItem('loginUser', JSON.stringify({}));
              sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
              window.location.href = URL.LOGIN;
              return false;
          }
      })
      .catch((err) => {
          console.log(err);
          alert("인증정보를 확인할 수 없습니다.");
          localStorage.setItem('jToken', '');
          sessionStorage.setItem('loginUser', JSON.stringify({}));
          sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
          window.location.href = URL.LOGIN;
          // 실패시 강제 로그아웃 시킨다.
      });
};

/**
 * 로그아웃 액션
 * @param loginUser: JSON
 */
const actionLogOut = (loginUser) => {
    const logOutUrl = '/signup/actionLogOut';

    axiosApi.post(logOutUrl, loginUser)
        .then( (res) => {
            if (Number(res.data.resultCode) === Number(CODE.RCV_SUCCESS)) {
                localStorage.setItem('jToken', '');
                sessionStorage.setItem('loginUser', JSON.stringify({}));
                sessionStorage.setItem('loginUserMenu', JSON.stringify({}));
                window.alert("로그아웃 되었습니다!");
                window.location.href = URL.LOGIN;
            }
        })
}

/**
 * 이메일 인증번호 전송
 * 인증번호 전송은 발신자는 이미 셋팅된 정보로서 수신자(회원)의 json 정보만 기술을 해서 넘겨주면 인증번호가 발송됨
 * @param emailInfo { to: 'sample@korea.kr', toName: '홍길동'}
 *  ** ** json 형식 일치하여 함수를 사용할 것! // to: 이메일정보(String | * 필수), toName: 수신자이름(String | * 선택사항)
 */
const sendAftcrEmailAuthNumber = (emailInfo) => {

    const sendAftcrEmailUrl = '/signup/sendAuthNumberByMail';

    const requestOptions = {
        headers: {
            'authorization': DPMSG_APIKEY
        },
        noLoading: true
    }
    return axiosApi.post(sendAftcrEmailUrl, emailInfo, requestOptions)
        .then( (res) => res.data)
        .catch( (err) => err );
};

/**
 * 이메일 인증번호 확인
 * @param emailInfo { to: 'sample@korea.kr', authNumber: '123456' }
 *  ** json 형식 일치하여 함수를 사용할 것! // to: 이메일정보(String | * 필수), authNumber: 인증번호(String | * 필수)
 */
const verifyingEmailAuthNumber = (emailInfo) => {

    const sendAftcrEmailUrl = '/signup/verificationAuthNumberOfMail';

    const requestOptions = {
        headers: {
            'authorization': DPMSG_APIKEY
        }
    };
    return axiosApi.post(sendAftcrEmailUrl, emailInfo, requestOptions)
        .then( (res) => res.data)
        .catch( (err) => err );
};

/**
 * 공통코드그룹 리스트 가져오기 ( 단건 및 그룹리스트 대응 )
 * @param cdGrpInfo : String | Object
 * @param usrDfnFld : 1, 2, 3  값 중 하나를 선택하면, 정의값1,2,3 으로 값이 표현됨(라벨명은 변경없음)
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const getCommCdList = (cdGrpInfo, usrDfnFld = '') => {
    if(cdGrpInfo.length < 1 ) {
        alert(MSG.SRCH_FAILURE + '\n' + MSG.SRCH_VALID);
        return;
    }
    return axiosApi.post(typeof cdGrpInfo === 'object' ? '/staff/commoncodemng/retrieveCommCodeGroupList' : '/staff/commoncodemng/retrieveCommCodeList'
        , typeof cdGrpInfo === 'object' ? { cdGrpList: cdGrpInfo, usrDfnFld: usrDfnFld } : { cdGrpCd: cdGrpInfo, usrDfnFld: usrDfnFld, useAt : '1' })
        .then((res) => typeof cdGrpInfo === 'object'
            ? devideCommCodeGroup(res.data.result.resultList) : res.data.result.resultList )
        .catch(err => {
            console.error(err);
            throw err;
        });
};

/**
 * 상세코드 ID 에 대응하는 상세코드명 array 나열 함수
 * 용도 : Ag Gring의 valueFormatter select 변환을 위함.
 * @param selectCdGroup : [{cdId:"", cdNm:""}...]
 * @param cdId : String
 * @returns {string|string|*}
 */
const getCdNmByCdId = (selectCdGroup, cdId) => {
    for (let i = 0; i < selectCdGroup.length; i++) {
        if (selectCdGroup[i].cdId === cdId) {
            return selectCdGroup[i].cdNm;
        }
    }
    return "";
};

/**
 * 공통코드그룹 그룹단위 배열 분리하기
 * 사용방법 : return resultArr => resultArr['공통그룹코드'] 단위로 코드 나열
 * @param commCdResult
 * @returns {[]}
 */
const devideCommCodeGroup = (commCdResult) => {
    let resultArr = [], currGrpCd = "";
    commCdResult.forEach( (item) => {
        if(!currGrpCd) {
            resultArr[item.cdGrpCd] = [ item ];
        } else {
            if(currGrpCd !== item.cdGrpCd ) {
                resultArr[item.cdGrpCd] = [ item ];
            } else {
                resultArr[currGrpCd].push(item);
            }
        }
        currGrpCd = item.cdGrpCd;
    })
    return resultArr;
};


/**
 * 현재 페이지의 그리드 전체데이터 가져오기
 * @param gridRef  ( * Ag Grid useRef )
 * @return rowData : [] ( ArrayList )
 */
const getRowData = (gridRef) => {
    const rowData = [];
    gridRef.current.api.forEachNode(function (node) {
        rowData.push(node.data);
    });
    // console.table(" =======> Row Data:", rowData);
    return rowData;
};

/**
 * 현재 페이지의 그리드 전체데이터 클리어링( All Remove 와 동일한 효과 ) ** 주의 : 해당함수는 setState를 넣고 사용미숙으로 한 액션에 2회 연속 동작하게되면, error 를 발생시킬 수 있음.
 * @param gridRef  ( * Ag Grid useRef )
 * @param setRowData ( setState )  // 그리드 데이터의 초기화가 필요한 경우 setState 를 넣어준다! // 선언과 자료형이 맞지 않으면 에러날수 있으니 주의!
 * @return clearData ( ArrayList )
 */
const clearRowData = (gridRef, setRowData) => {
    const rowData = getRowData(gridRef);
    const clearData = [];
    setTimeout( () => {
        gridRef.current.api.applyTransaction({
            remove: rowData,
        }).remove.forEach( (rowItem) => {
            clearData.push(rowItem);
        });

        if(setRowData !== undefined) {
            setRowData([]); // 초기화
        }
    }, 0);
    return clearData;
};

/**
 * 현재 페이지의 스테이트 정보를 가져온다. // 약속된 정의에서만 사용가능하다.
 *
 * @return location.state ( ArrayList )
 */
const currentPageState = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const location = useLocation();
    return location.state;
};

/**
 * 현재 페이지의 스테이트 정보를 가져온다. // 비정상접근 차단 방식!
 *
 * return currPageState
 */
const currentSafePageState = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    const currPageState = currentPageState();
    if (currPageState === null || currPageState === "" || currPageState === undefined) {
        setTimeout( () => {
            navigate(`${URL.ERROR}`);
        }, 0);
    }
    // 기능권한 제어!
    if( currPageState?.savFncAt !== "1" ) {
        $(".btn_add, .btn_save, .btn_edit, .btn_reply, .btn_regi, div.replyTextDiv, div.replyDiv").hide();
    }
    if( currPageState?.delFncAt !== "1" ) {
        $(".btn_del").hide();
    }
    if( currPageState?.dwldFncAt !== "1" ) {
        $(".btn_excel").hide();
    }
    if( currPageState?.closFncAt !== "1" ) {
        $(".btn_check, .btn_checkno, .btn_submit").hide();
    }

  return currPageState;
};


/**
 * 사용자별 메인 메뉴 데이터  // 주의: routes/index.jsx 에서의 메뉴 메인설정이 변경되면 동일하게 셋팅해줄 것!
 * @param bsnSeCd
 * @returns {{mainScnData: {}, mainScnUrl: string}}
 */
const getMainMenuPerUser = (bsnSeCd) => {

    const sessionMenu = JSON.parse(sessionStorage.getItem("sessionMenu"));
    // 쿼리 쪽이 더 비효율적인듯하여 아래처럼 셋팅함..
    let mainMasJson = {
        mainScnUrl: ""
        , mainScnData: {}
    };

    switch (bsnSeCd) {
        //routes/index.jsx 에 master 로 호출되는 url 이 변경되면 함께 다른 URL 로 고쳐줘야 함..
        case "PTI" :
            mainMasJson.mainScnUrl = URL.PATIENT;
            mainMasJson.mainScnData = { ...sessionMenu.filter((item) => (item.lvlNo === 2 && item?.scnUrl?.trim() === URL.PATIENT_LIST))[0] };
            break;
        case "NTC" :
            mainMasJson.mainScnUrl = URL.INFORM;
            mainMasJson.mainScnData = { ...sessionMenu.filter((item) => (item.lvlNo === 2 && item?.scnUrl?.trim() === URL.INFORM_NOTICE))[0] };
            break;
        case "STT" :
            mainMasJson.mainScnUrl = URL.DASHBOARD;
            mainMasJson.mainScnData = { ...sessionMenu.filter((item) => ( item.lvlNo === 2 && item?.scnUrl?.trim() === URL.DASHBOARD_STATUS))[0] };
            break;
        case "INT" :
            mainMasJson.mainScnUrl = URL.ABOUT;
            mainMasJson.mainScnData = { ...sessionMenu.filter((item) => (item.lvlNo === 2 && item?.scnUrl?.trim() === URL.ABOUT_BUSINESS))[0] };
            break;
        case "ADM" :
            mainMasJson.mainScnUrl = URL.ADMIN;
            mainMasJson.mainScnData = { ...sessionMenu.filter((item) => (item.lvlNo === 2 && item?.scnUrl?.trim() === URL.ADMIN_INSTTMNG))[0] };
            break;

        default :
            break;
    }
    return mainMasJson;
}


/**
 * 파일첨부초기화
 * @param fileRef  ( * useRef )
 */
const onClearAtchFiles = (fileRef) => {
    fileRef.current.value = "";
};

/**
 * 파일첨부초기화 제이쿼리버전
 */
const onClearAtchFilesQuery = () => {
    $("#cmnFileUploader").val("");
};

/**
 *  @param (Function) func // 실행될 function
 *  @param (Function) params // function에 들어갈 params
 * */
const useHandleEnterKeyPress = (func, params) => {
    return useCallback(
        (e) => {
            if (e.key === 'Enter') {
                func(params);
            }
        },
        [func, params]
    );
};

/**
 *  함수설명 : 초기 rowData와 변경된 rowData를 비교하여 변경 사항을 추출하는 함수
 *  @param (Object) initialData // 초기데이터
 *  @param (Object) updatedData // 변경된 데이터
 *  @param (String) key  // 식별을 위한 고유 key 값
 *
 *  @return (Object) {
 *      addedRows, // 추가된 데이터
 *      updatedRows, // 변경된 데이터
 *      deletedRows // 삭제된 데이터
 *  }
 */
const compareRowData = (initialData, updatedData, key) => {
    const add = [];
    const update = [];
    const remove = [];

    const duplicates = findDuplicateItemsByKey(updatedData, key);
    //같은 키를 가지는 행 구분 // 저장하는 데이터에 key값이 중복되는 값이 있다면 return
    if (duplicates.length > 0) {
        alert(MSG.GRID_DUPLICATED);
        return;
    } else {
        // 초기 데이터와 변경된 데이터의 각 행을 비교
        updatedData.forEach((updatedRow) => {
            //초기데이터에 변경된 데이터 존재여부
            const initialRow = initialData.find((row) => row[key] === updatedRow[key]);
            if (!initialRow) {
                // 변경된 데이터에만 있는 경우 => create
                add.push(updatedRow);
            } else if (!isEqual(initialRow, updatedRow)) {
                // 초기 데이터와 다른 경우 => update
                update.push(updatedRow);
            }
        });
        // 초기 데이터에만 있는 경우 => 삭제
        initialData.forEach((initialRow) => {
            if (!updatedData.find((row) => row[key] === initialRow[key])) {
                remove.push(initialRow);
            }
        });
        return {
            add,
            update,
            remove,
        };
    }
}

/**
 * 함수 설명 : 전체데이터에서 targetList을 대상으로 key의 value값이 중복되는지 체크, 배열 리턴
 * @param targetList
 * @param allDataList
 * @param key
 * @returns {*[]}
 */
const findDuplicateValues = (targetList, allDataList, key) => {
    const commonItems = [];

    const keySet = new Set(allDataList.map(itemB => itemB[key]));

    for (const item of targetList) {
        if (keySet.has(item[key])) {
            commonItems.push(item);
        }
    }

    return commonItems;
}

/**
 * 함수 설명 : arr에 key값을 기준으로 같은 데이터, 배열로 리턴.
 * @param arr
 * @param key
 * @returns {*[]}
 */
const findDuplicateItemsByKey = (arr, key) => {
    const seen = new Set();
    const duplicates = [];

    for (const item of arr) {
        const value = item[key];
        if (seen.has(value)) {
            duplicates.push(value);
        } else {
            seen.add(value);
        }
    }

    return duplicates;
}

/**
 * 함수 설명 : 문자열을 'yyyyMMdd' 형식에서 'yyyy-MM-dd' 형식으로 변환하는 함수
 * @param dateString
 * @returns {`${string}-${string}-${string}`}
 */
const parseDateString = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
}
/**
 * 함수 설명 :문자열의 바이트 수 체크
 * @param str
 * @returns {number}
 */
const getByteCount = (str) => {
    let byteCount = 0;

    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        if (charCode <= 0x7F) {
            byteCount += 1; // ASCII 문자 (1바이트)
        } else if (charCode <= 0x7FF) {
            byteCount += 2; // 2바이트 문자
        } else if (charCode <= 0xFFFF) {
            byteCount += 3; // 3바이트 문자
        } else if (charCode <= 0x10FFFF) {
            byteCount += 4; // 4바이트 문자
        }
    }
    return byteCount;
}

/**
 * 함수 설명 :문자열의 바이트 수 체크
 * @param value
 * @returns {*}
 */
const getValueByte = (value) => {

    let regex1 = /[a-z]|[0-9]/gi; //영숫자 패턴 1바이트
    let regex2 = /\s/g; // 띄어쓰기
    let regex3 = /[^\w\sㄱ-힣()0-9 ]/g; // 영숫자,한글이 아닌 문자
    let regex4 = /[ㄱ-힣]/g; //한글패턴 3바이트

    // 매치 확인~!
    let vEx1 = value.match(regex1);
    let vEx2 = value.match(regex2);
    let vEx3 = value.match(regex3);
    let vEx4 = value.match(regex4);

    vEx1 = vEx1 != null ? vEx1.length : 0;
    vEx2 = vEx2 != null ? vEx2.length : 0;
    vEx3 = vEx3 != null ? vEx3.length : 0;
    vEx4 = vEx4 != null ? vEx4.length : 0;

    return vEx1 + vEx2 + vEx3 + (vEx4 * 3); // UTF-8 한글은 1문자당 3바이트
};

/**
 * 패스워드 형식검증
 * @param password : String
 * @param rtnCharAt : boolean
 * @returns {boolean} || {String}  =  h : 한글 / s : 띄어쓰기 / cb : 조합 / lg : 길이
 */
const getPasswordCheck = (password, rtnCharAt = false) => {

    const regex1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; //특수기호 정규식
    const regex2 = /[a-z]/g; //영문소문자 정규식 // 영문대소문자경우 [a-zA-Z] 임
    const regex25 = /[A-Z]/g; //영문대문자 정규식
    const regex3 = /[0-9]/g; //숫자 정규식
    const regex4 = /\s/g; // 띄어쓰기 정규식
    const regex5 = /[ㄱ-힣]/g; // 한글 정규식

    // 매치 확인~!
    let vEx1 = password.match(regex1);
    let vEx2 = password.match(regex2);
    let vEx25 = password.match(regex25);
    let vEx3 = password.match(regex3);
    let vEx4 = password.match(regex4);
    let vEx5 = password.match(regex5);

    vEx1 = vEx1 !== null ? vEx1.length : 0;
    vEx2 = vEx2 !== null ? vEx2.length : 0;
    vEx25 = vEx25 !== null ? vEx25.length : 0;
    vEx3 = vEx3 !== null ? vEx3.length : 0;
    vEx4 = vEx4 !== null ? vEx4.length : 0;
    vEx5 = vEx5 !== null ? vEx5.length : 0;

    const pass = vEx1 + vEx2 + vEx25 + vEx3;
    const reject = vEx4 + vEx5;

    if( reject > 0 ) {
        //console.log(" =========> reject char count : " + reject );
        if(!rtnCharAt) {
            alert("비밀번호는 한글 문자열 및 띄어쓰기는 허용되지 않습니다.");
        }
        return !rtnCharAt ? false : "hs";
    } else {
        if( pass >= 8 && pass < 13) {
            // 기존은  영문대소문자, 숫자, 특수문자 2개이상의 조합이었음. 25. 05. 이후로 인증서버 정규식에 동일하게 맞추기로 함.
            //if( (vEx1 > 0 && vEx2 > 0) || (vEx1 > 0 && vEx3 > 0) || (vEx2 > 0 && vEx3 > 0)) {
            if( vEx1 > 0 && vEx2 > 0 && vEx25 > 0 && vEx3 > 0 ) { // 영문소문자,대문자,숫자,특수문자 1개 이상 조합
                return !rtnCharAt ? true : "ok";
            } else {
                //console.log(" =========> reject sp char count : " + vEx1 );
                if(!rtnCharAt) {
                    alert("영문소문자, 영문대문자, 숫자, 특수기호 각 1개 이상 조합으로 입력해주세요.");
                }
                return !rtnCharAt ? false : "cb";
            }
        } else {
            //console.log(" =========> reject password count : " + pass );
            if(!rtnCharAt) {
                alert("비밀번호는 8~12자 입력해 주세요");
            }
            return !rtnCharAt ? false : "lg";
        }
    }
};


/**
 * 그리드 컬럼 입력 유효검사
 * @param e
 */
const gridValidCheck = (e) => {
    let msg = '* 입력데이터 경고 *\n';
    let vaild = true;

    if(e.colDef.maxByte){ // editable 속성을 사용하여 직접 input 박스를 수정할 경우의 Vaild 체크
        const byte = getValueByte(e.newValue);
        if(byte > e.colDef.maxByte){
            msg += "- " + e.colDef.headerName + "는(은) "+e.colDef.maxByte+"byte 이상 초과 할 수 없습니다. \n [ 현재 byte : " + byte+ "byte ] \n";
            vaild = false;
            e.node.setDataValue(e.column, e.oldValue);
        }
    }

    if(e.colDef.maxLength){
        if( e.newValue.length > e.colDef.maxLength){
            msg += "- " + e.colDef.headerName + "는(은) "+e.colDef.maxLength+"자리 이상 초과 할 수 없습니다. \n [ 현재 글자수 : " + e.newValue.length + " ] \n";
            vaild = false;
            e.node.setDataValue(e.column, e.oldValue);
        }
    }

    if(e.colDef.valueFormat) { // 특정 문자,숫자,영문 입력해야할 경우의 Vaild 체크
        switch (e.colDef.valueFormat) {
            case "noKor":
                const noKorPattern = /[^a-zA-Z0-9\s~!@#$%^&*()_+|<>?]+/g;
                if (noKorPattern.test(e.newValue)) {
                    msg += "- " +MSG.VAILD.NO_KOR+"\n";
                    vaild = false;
                }
                break;
            case "noEng":
                const noEngPattern = /[^가-힣0-9\s~!@#$%^&*()_+|<>?]+/g;
                if (noEngPattern.test(e.newValue)) {
                    msg += "- " +MSG.VAILD.NO_ENG+"\n";
                    vaild = false;
                }
                break;
            case "num":
                const numberPattern = /[^0-9]+/g;
                if (numberPattern.test(e.newValue)) {
                    msg += "- " +MSG.VAILD.NUMBER+"\n";
                    vaild = false;
                }
                break;

        }
    }

    // 공백 허용 여부
    if(e.colDef.trim){
        e.node.setDataValue(e.column, e.newValue.replace(/\s/g, ""));
    }

    if(!vaild){
        alert(msg);
        e.node.setDataValue(e.column, e.oldValue);
    }
};

/**
 * 함수 설명 : 값으로 라벨이 되는 구조의 간단한 셀렉트박스용 배열리스트데이타 생성
 * @param dataList : []      // arrayList
 * @param repLabelNm : string  // 반복될 문자
 * @param repEmptyNm : string  // 첫번째 지정 공문자
 * @param position : number    // 1. repLabelNm 을 앞에 / 2. repLabelNm 을 뒤에  / default : 2
 * @returns [{value : dataList[n] , label : dataList[n] + repLabelNm }]
 */
const selectBoxSimpleSetData = (dataList, repLabelNm, repEmptyNm, position = 2) => {
    let resultList = [];

    if( repEmptyNm !== undefined && repEmptyNm !== null && repEmptyNm !== "") {
        resultList.push({ value: "", label: repEmptyNm });
    }
    if( position === 2 ) {
        dataList.forEach(el => {
            resultList.push({ value: el, label: el + repLabelNm });
        })
    } else {
        dataList.forEach(el => {
            resultList.push({ value: el, label: repLabelNm + el });
        })
    }
    return resultList;
};


/**
 * 엑셀다운로드 ( XLSX 모듈전용 )
 * ※ 주의 : 24.01.04. 현재 버전에서 그리드의 jsonArray 형태로 넘기면 key 가 항목이 되므로, 가공처리가 필요함.
 * 가공처리를 하여도 화면에 보이는 그리드의 형태 그대로 나오지 않을수 있어 그리드와의 콜라보는 잠정보류. 콜라보를 하기 위해서는 ag-grid 의 columnDefs 활용하여 변환이 필요!
 * 사용성 : 화면에 그리드 존재여부 상관없이 데이터만 넘겨 엑셀 데이터로 뽑는 경우에는 유용함으로 이때 사용할것! 다건 데이터에 유리!
 *
 * @param fileName : string
 * @param dataList : jsonArray
 * @param columnDefs : jsonArray
 */
const excelDownload = (fileName = "aftcrExcel", dataList, columnDefs= []) => {

    if (dataList.length < 1) {
        alert("다운로드 받을 데이터가 존재하지 않습니다.\n 확인 후 다시 시도해 주세요");
        return;
    }

    setTimeout( () => {
        //파일명 특수문자 제거 정규식
        const reg = /[\[\]\/?;:|`!<>\\\'\"]/gi;
        const excelFileNm = fileName.replace(reg,'') + "_" + getDateString()+".xlsx";

        let ws = XLSX.utils.json_to_sheet(dataList);
        /*
        // 24.01.05. 기준 * 현재 모든 화면에서 columnDefs 를 참조할수 없어 해당 기능 점검 잠정 보류!!
        // 컬럼정보가 들어왔을 시, WorkSheet 의 헤더를 한글로 교체해주는 작업. WorkSheet에 떨어지는 dataList 순으로 한글변환처리해줘야함!
        if( columnDefs.length > 0 ) {
            // 현재 버전까지는 가장 마지막 헤더를 기준으로 생성. rowSpan 처리까지 되어 실제 3개의 행이라면, 마지막 행기준을 헤더로 잡음!
            const pos = columnDefs.length;
            columnDefs[pos].forEach((item, idx) => {
                const addCol = XLSX.utils.encode_cell({c:idx, r:0});
                ws[addCol].v = item.headerName; // 실제 WorkSheet 에서 첫번째 헤더에
            });
        }
        */
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, fileName);
        XLSX.writeFile(wb, excelFileNm);

        alert("[ " + fileName + " ] \n엑셀 다운로드 완료되었습니다.");
    }, 0);
};

/**
 * 엑셀다운로드 ( AG-Grid Ver)
 * ※ 사용성 : 현재 페이지 그리드에 보이는 기준으로 엑셀데이터 다운로드
 *            ㄴ 페이징 처리가 된 그리드의 페이지 전체 데이터 다운로드는 hide 처리된 또 하나의 그리드를 준비하여, 엑셀 다운로드 버튼 클릭시 따로 전체데이터를 조회 시킨 이후 처리해야 함!
 * @param fileName : string
 * @param dataList : jsonArray
 */
const agGridExcelDownload = (fileName = "aftcrExcel", gridRef) => {

    const rowData = getRowData(gridRef);
    if( rowData.length < 1 ) {
        alert("다운로드 받을 데이터가 존재하지 않습니다.\n데이터 조회 후 시도해 주세요");
        return;
    }

    setTimeout( () => {
        //파일명 특수문자 제거 정규식
        const reg = /[\[\]\/?;:|`!<>\\\'\"]/gi;
        const excelFileNm = fileName.replace(reg,'') + "_" + getDateString();

        const options = {
            skipHeader: false,
            skipFooters: true,
            skipGroups: true,
            fileName: excelFileNm
        };

        gridRef.current.api.exportDataAsCsv(options);

        alert("[ " + fileName + " ] \n엑셀 다운로드 완료되었습니다.");
    }, 0);
};

/**
* 색상코드 만들기
*
* @param idx : Number
* @param return : String
*/
const getIndexColor = (idx) => {

    let color = "";

    switch (idx) {

        case 0 :
            color = "#FF3636";
            break;
        case 1 :
            color = "#FFE08C";
            break;
        case 2 :
            color = "#50AF49";
            break;
        case 3 :
            color = "#3DB7CC";
            break;
        case 4 :
            color = "#4375DB";
            break;
        case 5 :
            color = "#27248A";
            break;
        case 6 :
            color = "#9354ED";
            break;
        case 7 :
            color = "#E14FCA";
            break;
        case 8 :
            color = "#99004C";
            break;
        case 9 :
            color = "#ED4C00";
            break;
        case 10 :
            color = "#6B9900";
            break;
        case 11 :
            color = "#CCA63D";
            break;
        default :
            color = "#8C8C8C";
            break;
    }
    return color;
};

// 24시간 형식의 숫자 문자열(예: "0930" 또는 "1530")을 12시간 한국어 형식(예: "오전 09시 30분")으로 변환하는 함수
const formatTime24 = (input) => {
    // 입력이 4자리 숫자형 문자열이어야 함
    if (!/^\d{4}$/.test(input)) return '잘못된 입력';

    const hour24 = parseInt(input.slice(0, 2), 10);
    const minute = parseInt(input.slice(2, 4), 10);

    // 오전/오후 구분
    const period = hour24 < 12 ? '오전' : '오후';

    // 12시간제로 변환 (0시는 12시로, 13~23시는 -12)
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;

    return `${period} ${String(hour12).padStart(2, '0')}시 ${String(minute).padStart(2, '0')}분`;
};


/**
 * YYYYMMDD 형식의 문자열을 받아 "YY.MM.DD(요일)" 형식으로 변환하는 함수
 * 예: "20250618" → "25.06.18(수)"
 *
 * @param {string} input - 8자리 날짜 문자열 (예: "20250618")
 * @returns {string} - 변환된 날짜 문자열 (예: "25.06.18(수)")
 */
const formatDateWithWeekday = (input) => {
    if (!input || input.length !== 8) return ""; // 잘못된 형식 방어
    // 날짜 문자열을 연도, 월, 일로 분리
    const year = parseInt(input.slice(0, 4), 10);
    const month = parseInt(input.slice(4, 6), 10) - 1; // JavaScript는 0부터 시작
    const day = parseInt(input.slice(6, 8), 10);

    const date = new Date(year, month, day);

    // 요일 배열 (일요일부터 시작)
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const weekDay = dayNames[date.getDay()];

    // 결과 형식: yy.mm.dd(요일)
    const formatted = `${String(year).slice(2)}.${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}(${weekDay})`;
    return formatted;
};

/**
 * 주민번호로 성별 정보 리턴
 * @param jumin : String => 주민번호 또는 성별 자릿수 한자리
 * @returns {string}
 */
const getGenderByJumin = (jumin) => {
    // 하이픈(-) 제거
    const cleanJumin = jumin.replace(/-/g, "");

    let genderNum = "";
    if(cleanJumin.length === 13) {
        // 뒷자리 첫 번째 숫자 추출 (7번째 문자, 인덱스 6)
        genderNum = cleanJumin.charAt(6);
    } else if( cleanJumin.length === 1 ) {
        genderNum = cleanJumin;
    } else {
        return '유효하지 않은 주민등록번호입니다.';
    }

    if (['1', '3', '5', '7'].includes(genderNum)) {
        return 'M';
    } else if (['2', '4', '6', '8'].includes(genderNum)) {
        return 'F';
    } else {
        return '유효하지 않은 주민등록번호입니다.';
    }
};

/**
 * 생년월일 6자리 정규식 검증 체크 ( 실제 연도는 2자리여서 무의미해 월, 일 만 검증 )
 * @param birth
 * @returns {boolean}
 */
const getIsBirthSix = (birth) => {

    if(birth.length !== 6 ) { // 자릿수체크
        return false;
    }
    const regexBirth = /^(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
    if(!regexBirth.test(birth)) return false;
    const month = parseInt(birth.substr(2, 2), 10) - 1; // JS는 0~11월
    const day = parseInt(birth.substr(4, 2), 10);
    const date = new Date( 1999, month, day); // 년도는 두자리라 무의미해 임의이고, 실제 월,일자만 체크함.
    return (
        date.getMonth() === month &&
        date.getDate() === day
    );
};

/**
 * 생년월일 8자리 정규식 검증 체크
 * @param birth
 * @returns {boolean}
 */
const getIsBirthEight = (birth) => {

    if(birth.length !== 8 ) { // 자릿수체크
        return false;
    }
    const regexBirth = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;
    if (!regexBirth.test(birth)) return false;
    const year = parseInt(birth.substr(0, 4), 10);
    const month = parseInt(birth.substr(4, 2), 10) - 1; // JS는 0~11월
    const day = parseInt(birth.substr(6, 2), 10);
    const date = new Date(year, month, day);
    return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
    );
};

/**
 * 6자리 생년월일, 성별1자리로 => 8자리 생년월일로 변환
 * @param birth6 : String 필수
 * @param genderNum : String 필수
 * @returns {string}
 */
const getConvertToFullBirth = (birth6, genderNum) => {

    if(!isNaN(birth6)) {
        birth6 = birth6.toString();
        if(birth6.length !== 6) {
            return '유효하지 않은 생년월일 입니다. 6자리 생년월일을 넣어주세요.';
        }
    } else {
        return '유효하지 않은 생년월일 입니다. 6자리 생년월일을 넣어주세요.';
    }
    if(!isNaN(genderNum)) {
        genderNum = genderNum.toString();
        if(genderNum.length !== 1) {
            return '유효하지 않은 성별 숫자입니다. 1자리 성별숫자 넣어주세요.';
        }
    } else {
        return '유효하지 않은 성별 숫자입니다. 1자리 성별숫자 넣어주세요.';
    }
    // 성별 숫자에 따라 세기 결정 (1,2: 1900년대, 3,4: 2000년대)
    let century = '';
    if (genderNum === '1' || genderNum === '2') {
        century = '19';
    } else if (genderNum === '3' || genderNum === '4') {
        century = '20';
    } else {
        return '유효하지 않은 성별 숫자입니다.';
    }
    // 6자리 생년월일 앞에 세기 붙이기
    return century + birth6;
};

/**
 * BMI 지수 및 결과 리턴
 * @param height : 키
 * @param weight : 몸무게
 * @return JSON : ex) { bmi : 21.5 }
 */
const calculateBMI = (height, weight) => {

    if(isNaN(height*weight)) {
        return { status : CODE.RCV_FAILURE, message : "키 또는 몸무게 정보가 잘못되었습니다." }
    }
    if( 0 > height*weight ) {
        return { status : CODE.RCV_FAILURE, message : "키 또는 몸무게는 마이너스 수치가 될수 없습니다." }
    }
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    let resultJson = {};

    switch (bmi) {

        case ( 18.5 > bmi ) :
            resultJson.result = "저체중";
            break;
        case ( 18.5 <= bmi && bmi > 23 ) :
            resultJson.result = "정상";
            break;
        case ( 23 <= bmi && bmi > 25 ) :
            resultJson.result = "과체중";
            break
        default :
            resultJson.result = "비만";
            break;
    }
    resultJson.bmi = bmi;
    return {  status : CODE.RCV_SUCCESS, bmi : bmi, result : resultJson };
};


/**
 * 전화번호 부분암호화(중간자리)
 * @param phoneNo
 * @param mDigit
 * @param gbnChar
 * @returns {*}
 */
const getEncryptPartOfPhoneNo = (phoneNo, gbnChar = "-") => {

    const regex1 = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g; //특수기호 정규식
    const regex2 = /[0-9]/g; //숫자 정규식

    if(phoneNo === undefined || phoneNo === null || phoneNo === "") {
        console.log("==========> getEncryptPartOfPhoneNo Error : Not find phone number");
        return false;
    }

    let encPhoneNo;
    if( typeof phoneNo === "string") {

        let vEx1 = phoneNo.match(regex1);
        let vEx2 = phoneNo.match(regex2);

        if(vEx1 !== null) { // 특수문자 혼합인 경우,
            const vEx1Set = new Set(vEx1);
            if(vEx1Set.size === 1) { // 동일 특수문자만 허용함.
                if(vEx1.length === 2) {
                    const spChar = [ ...vEx1 ][0];
                    const frstIdx = phoneNo.indexOf(spChar);
                    const sendIdx = phoneNo.indexOf(spChar, frstIdx + 1);
                    const midPhoneNo =  phoneNo.substring(frstIdx + 1, sendIdx);
                    encPhoneNo = phoneNo.replace(midPhoneNo, "****");
                } else {
                    console.log(" =============> getEncryptPartOfPhoneNo Error : Use able to Special character is only twice");
                    return false
                }
            } else {
                console.log(" =============> getEncryptPartOfPhoneNo Error : Only one type of special character");
                return false
            }

        } else { // 숫자로만 스트링값으로 넘긴 경우 (가장 일반적인 경우)

            if(vEx2 !== null) { // 정상 적인 경우에만, 진행
                if(vEx2.length >= 9 && vEx2.length <= 11 ) { // 번호 범위~
                    const midNo = "****";
                    const edNo = phoneNo.substring(phoneNo.length -4);
                    let frNo;
                    if(vEx2.length === 9) {
                        frNo = phoneNo.substring(0, 2);
                    } else if(vEx2.length === 10) {
                        frNo = phoneNo.substring(0, 2);
                        if(frNo !== "02") {
                            frNo = phoneNo.substring(0, 3);
                        }
                    } else if(vEx2.length === 11) {
                        frNo = phoneNo.substring(0, 3);
                    }
                    encPhoneNo = frNo + gbnChar + midNo + gbnChar + edNo;
                } else {
                    console.log(" =============> getEncryptPartOfPhoneNo Error : Phone number length over range");
                    return false
                }
            } else {
                console.log(" =============> getEncryptPartOfPhoneNo Error : Not find phone number of phoneNo");
                return false
            }
        }
    } else {
        console.log("==========> getEncryptPartOfPhoneNo Error : phone number type error : only string");
        return false;
    }
    return encPhoneNo;
};

export {
    getDateString,
    lpad,
    rpad,
    screenReload,
    getIsDpAuthUserId,
    setDpAuthSignup,
    getDpFindUserId,
    setDpAuthChangePassword,
    getDpAuthSignin,
    getDpAuthSendSms,
    getDpAuthSmsCheck,
    getDpAuthHpSignIn,
    setDpChangePhoneNumber,
    getDpAuthRefeshTokenSimple,
    getDpAuthRefeshToken,
    actionLogOut,
    sendAftcrEmailAuthNumber,
    verifyingEmailAuthNumber,
    getCommCdList,
    getCdNmByCdId,
    getRowData,
    clearRowData,
    currentPageState,
    currentSafePageState,
    getMainMenuPerUser,
    onClearAtchFiles,
    onClearAtchFilesQuery,
    useHandleEnterKeyPress,
    compareRowData,
    findDuplicateValues,
    parseDateString,
    getByteCount,
    getPasswordCheck,
    gridValidCheck,
    selectBoxSimpleSetData,
    agGridExcelDownload,
    excelDownload,
    getIndexColor,
    formatTime24,
    formatDateWithWeekday,
    getGenderByJumin,
    getIsBirthSix,
    getIsBirthEight,
    getConvertToFullBirth,
    calculateBMI,
    getEncryptPartOfPhoneNo
}

let globalSetLoading = null;
export function setLoadingHandler(fn) {
    globalSetLoading = fn;
}
export function getLoadingHandler() {
    return globalSetLoading;
}
