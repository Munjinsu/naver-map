const CODE = {
    RCV_SUCCESS             : "200", // 성공
    RCV_FAILURE             : "300", // 실패

    RCV_BAD_REQUEST         : "400", // 잘못된 요청
    RCV_BAD_UNAUTH          : "401", // 인증 오류1(클라이언트)
    RCV_ERROR_AUTH          : "403", // 인증 오류2(서버사이드)
    RCV_ERROR_SERVER        : "500", // 내부서버 오류
    RCV_ERROR_DELETE        : "700", // 삭제 오류
    RCV_ERROR_SAVE          : "800", // 저장 오류
    RCV_ERROR_VALIDATION    : "900", // 입력 오류

    MODE_CREATE         : "create", // 등록 모드
    MODE_MODIFY         : "modify", // 수정 모드
    MODE_READ           : "read",   // 읽기 모드
    MODE_REPLY          : "reply",  // 답글 모드

    DATE_YEAR           : "year",
    DATE_MONTH          : "month",
    DATE_DATE           : "date",
    DATE_WEEK           : "week",
    DATE_DAY            : "day",

    DEV_MODE            : "dev",
}

export default CODE;