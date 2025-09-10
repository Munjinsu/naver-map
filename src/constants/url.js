export const SERVER_URL = process.env.REACT_APP_AFTCR_CONTEXT_URL; // REST API 서버 Domain URL
export const DPAUTH_URL = process.env.REACT_APP_AUTH_CONTEXT_URL; // REST API 서버 Domain URL
export const IMAGE_URL = SERVER_URL + "/cmm/fms/getImage?atchFileStr=";
export const AFTCR_OS_AT = process.env.REACT_APP_AFTCR_OS_MODE; // AFTERCARE 운영모드
export const DPAUTH_APIKEY = "fZ378yZjTzGh4XDlZmYAOg";
// export const DPAUTH_INITKEY = "dp123456@D";
export const DPAUTH_INITKEY = process.env.REACT_APP_DPAUTH_INITKEY;
export const DPMSG_APIKEY = process.env.REACT_APP_DPMSG_API_KEY;

const URL = {
    //COMMON
    MAIN                        : "/", //메인페이지
    LOGIN                       : "/login", //로그인

    ERROR                       : "/error", //에러

    /* === 작업중 25.08.18 :: S ===*/

    // 홈
    MAIN_HOME                   : "/home", 
    MAIN_MY_INFORM              : "/home/myinform", 

    // 환자 앱
    PATIENT_DOMESTIC            : "/pat/dommem", 
    PATIENT_DOMESTIC_DETAIL     : "/pat/dommem/detail", 
    PATIENT_OVERSEAS            : "/pat/overmem", 
    PATIENT_OVERSEAS_DETAIL     : "/pat/overmem/detail", 
    PATIENT_WITHDRAW            : "/pat/withmem", 
    PATIENT_NOTICE              : "/pat/notice", 
    PATIENT_NOTICE_REGIST       : "/pat/notice/regist", 
    PATIENT_FAQ                 : "/pat/faq", 
    PATIENT_FAQ_REGIST          : "/pat/faq/regist", 
    PATIENT_ERROR_REPORT        : "/pat/report", 
    PATIENT_ERROR_REPORT_DETAIL : "/pat/report/detail", 

    // 의료진 웹
    DORTOR_WAITING              : "/doc/waitmem", 
    DORTOR_WAITING_DETAIL       : "/doc/waitmem/detail", 
    DORTOR_NORMAL               : "/doc/normem" , 
    DORTOR_NORMAL_DETAIL        : "/doc/normem/detail" , 
    DORTOR_DELETED              : "/doc/delmem" , 
    DORTOR_DELETED_DETAIL       : "/doc/delmem/detail" , 
    DORTOR_RIGHT_SETTINGS       : "/doc/rightset", 
    DORTOR_RIGHT_REGIST         : "/doc/rightset/regist", 
    DORTOR_NOTICE               : "/doc/notice" , 
    DORTOR_NOTICE_REGIST        : "/doc/notice/regist" , 

    // 관리자 웹
    MANAGER_WAITING             : "/mgr/waitmem" , 
    MANAGER_WAITING_DETAIL      : "/mgr/waitmem/detail" , 
    MANAGER_NORMAL              : "/mgr/normem", 
    MANAGER_NORMAL_DETAIL       : "/mgr/normem/detail", 
    MANAGER_DELETED             : "/mgr/delmem", 
    MANAGER_DELETED_DETAIL      : "/mgr/delmem/detail", 
    MANAGER_RIGHT_SETTINGS      : "/mgr/rightset", 
    



    /* === 작업중 25.07.11 :: E ===*/


    //API Request
    API_REQ                     : "/api/request/:reqJson",

}

export default URL;
