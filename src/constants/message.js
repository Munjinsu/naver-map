const MSG = {
  //NETWORK
  ERR_NETWORK  : "네트워크 오류!! \n서버와의 통신에 문제가 발생하였습니다!!",
  ERR_RESULT  : "데이터처리 중 오류가 발생하였습니다. \n오류코드 : ",
  ERR_SIGNIN  : "Medical Staff 사용자 정보를 확인할 수 없습니다. \n정보 분실시 [ 아이디/비밀번호 찾기 ] 통해 정보를 확인하십시오!",
  ERR_UNSIGN  : "사용자를 확인 할 수 없습니다.",
  ERR_DUPUSR  : "이미 Medical Staff 사용자 등록이 완료된 유저 입니다. \n사용자 목록을 확인해주세요!",
  ERR_PSSUSR  : "아이디/비밀번호를 다시 확인 해주세요.",
  ERR_AUTH    : "권한인증 정보를 확인할 수 없습니다. \n문제가 지속되면 관리자에 문의해주세요!",
  ERR_TOKEN   : "접근토큰 정보를 확인할 수 없습니다. \n문제가 지속되면 관리자에 문의해주세요!",
  ERR_SESSION : "사이트 세션 토큰인증이 만료되었거나, \n권한이 불충분합니다!!",

  //PROCESS
  PRCS_SAVECONFIRM : "저장 하시겠습니까?",
  PRCS_SAVECOMPLT : "저장 처리 완료 되었습니다.",
  PRCS_SUBMIT     : "제출 처리 완료 되었습니다.",
  PRCS_REJECT     : "반려 처리 완료 되었습니다.",
  PRCS_DELETECONFIRM : "삭제 하시겠습니까?",
  PRCS_DELETECOMPLT : "삭제 처리 완료 되었습니다.",
  PRCS_FAILSAVE   : "저장에 실패 하였습니다.",

  //SEARCH
  SRCH_COMPLT     : "조회가 완료되었습니다.",
  SRCH_NODATA     : "조회조건의 데이터가 존재하지 않습니다.",
  SRCH_FAILURE    : "조회가 실패하였습니다.",
  SRCH_VALID      : "조회조건을 확인해 주십시오.",

  //GRID
  GRID_DUPLICATED : "그리드에 중복된 데이터가 있습니다.\n다시 확인해주세요.",
  GRID_NOSELECTED : "그리드에 선택된 데이터가 없습니다.\n다시 확인해주세요.",
  GRID_EDITINGNOW : "그리드가 현재 편집중에 있습니다.\n완료 후 진행해주세요.",
  GRID_NOSAVEDATA : "저장 할 데이터가 없습니다.\n확인 후 진행주세요.",

  //ATTACH
  ATCH_INITFILE : "파일을 다시 올리시겠습니까?\n현재 담은 파일은 초기화됩니다.",


  //유효검사
  VALID_NOFORMS : "양식의 항목수가 상이가 합니다. \n지정된 양식을 사용해주세요!",
  VALID_ATCHEXT : "파일 확장자를 확인해 주시기 바랍니다.\n첨부 불가능한 확장자 파일입니다.\n첨부할 파일을 다시 확인해 주세요.",
  VALID_ATCHSIZE : "'용량이 초과 되었습니다.\n\n", // 상황에 따른 추가내용 덧붙여 사용

  VALID: {
    NUMBER : "숫자만 입력할 수 있습니다.",
    NO_ENG : "영문은 입력할 수 없습니다.",
    NO_KOR : "한글은 입력할 수 없습니다.",
  }
}

export default MSG;
