import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from 'constants/url';
import URL from 'constants/url';
import CODE from 'constants/code';
import axiosApi from '../../api/daonAxios';

const AttachFile = ({ boardFiles, mode, fnChangeFile, fnDeleteFile, posblAtchFileNumber }) => {
    console.groupCollapsed("==============> AttachFile");
    // console.log(" ============> boardFiles : ", boardFiles);
    // console.log(" ============> mode : ", mode );

    // posblAtchFileNumber는 수정일 경우에만 값이 넘어오므로 방어 로직
    // 해당 컴포넌트는 스케줄 화면과 공유하며, 스케줄에서는 첨부파일을 1개 넣을 수 있으므로 디폴트 값을 1로 설정
    if (typeof posblAtchFileNumber == "undefined" || posblAtchFileNumber == null) {
        posblAtchFileNumber = 1;
    }

    const navigate = useNavigate();

    const fileRef = useRef();

    function onClickDownFile(atchFileId, fileSn) {
        console.log(" ============> onClickDownFile atchFileId : ", atchFileId);

        window.open(SERVER_URL + "/cmm/fms/FileDown.do?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "");
    }

    function onClickDeleteFile(atchFileId, fileSn, fileIndex) {
        console.log("onClickDeleteFile Params : ", atchFileId, fileSn, fileIndex);

        const requestUrl = `/cmm/fms/deleteFileInfsAPI.do`;

        const jToken = localStorage.getItem('jToken');

        const requestOptions = {
            headers: {
                'Authorization': jToken,
                'Content-type': 'application/json'
            },
        }

        const delFile = {
            atchFileId: atchFileId,
            fileSn: fileSn
        }

        axiosApi.post(requestUrl, delFile, requestOptions)
            .then((res) => {
                console.log("===>>> board file delete= ", res.data);
                if (Number(res.data.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    console.log("Deleted fileIndex = ", fileIndex);
                    const _deleteFile = boardFiles.splice(fileIndex, 1);
                    const _boardFiles = Object.assign([], boardFiles);
                    fnDeleteFile(_boardFiles);
                    // onClearAtchFiles(fileRef);
                    alert("첨부파일이 삭제되었습니다.");
                    fnChangeFile({});
                } else {
                    navigate({ pathname: URL.ERROR }, { state: { msg: res.data.resultMessage } });
                }

            })
            .catch(err => console.error("=============> atchfile error : ", err));
    }

    function onChangeFileInput(e) {
        console.log("===>>> e = " + e.target.files[0]);
        if (e.target.files.length + (boardFiles?.length || 0) > posblAtchFileNumber) {
            alert('총 첨부파일 개수는 ' + posblAtchFileNumber + ' 까지 입니다.');
            e.target.value = null; // 파일 입력란 화면 초기화
            fnChangeFile({}); // 상위 컴포넌트의 저장된 값 초기화
            return false;
        }
        fnChangeFile(e.target.files);
    }

    let filesTag = [];

    if (boardFiles !== undefined) {
        boardFiles.forEach(function (item, index) {
            filesTag.push(
                <React.Fragment key={index}>
                    <div className='already'>
                        <a href={"#LINK"} onClick={function (e) {
                            e.preventDefault();
                            onClickDownFile(item.atchFileId, item.fileSn);
                        }} download>
                            {item.orignlFileNm}
                        </a>
                        <span>
                            [{item.fileMg}byte]
                        </span>
                        {mode === CODE.MODE_MODIFY &&
                            <React.Fragment key={["button", `${index}`].join(" ")}>
                                <button className="file_delete" onClick={(e) => {
                                    onClickDeleteFile(item.atchFileId, item.fileSn, index);
                                }}>
                                    <span className='sr-only'>삭제</span>
                                </button>
                            </React.Fragment>
                        }
                    </div>
                </React.Fragment>
            );

            // filesTag.push(<br key={["br", `${index}`].join(" ")}/>);
        });
    }
    console.log("filesTag : ", filesTag);
    console.groupEnd("AttachFile");

    return (
        <dl>
            <dt>
                <span>첨부파일</span>
            </dt>
            <dd className='attach_area'>
                <div className='attach_file'>
                    {filesTag}
                    {(mode === CODE.MODE_CREATE) &&
                        <>
                            <input name="file_0" id="cmnFileUploader" type="file" multiple onChange={e => onChangeFileInput(e)} ref={fileRef}></input>
                            <p className='possible'>총 업로드 가능한 첨부파일 개수는 {posblAtchFileNumber} 개 입니다.</p>
                        </>
                    }
                </div>
                {/* 첨부파일 1개 당  filesTag는 3개 요소(span, button, br)를 가진다 */}
                <div className='attach_file2'>
                    {(mode === CODE.MODE_MODIFY && (filesTag.length / 3 < posblAtchFileNumber)) &&
                        <>
                            <input name="file_0" id="cmnFileUploader" type="file" multiple onChange={e => onChangeFileInput(e)} ref={fileRef}></input>
                            <p className='possible'>현재 업로드 가능한 첨부파일 개수는 {posblAtchFileNumber - (filesTag.length / 3)} 개 입니다.</p>
                        </>
                    }
                </div>
            </dd>
        </dl>
    );
}

export default React.memo(AttachFile);
