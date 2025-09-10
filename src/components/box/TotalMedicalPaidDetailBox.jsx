import React, { useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import imgCloseBtn from "../../images/common/i_close_btn.svg";
import axiosApi from '../../api/daonAxios';
import CODE from '../../constants/code';


// 병원케어  >  진료내역 > 진료 상세 > 총 진진료비

const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: ${({ $type })=> $type === 'normal' ? '0': '3.8rem 1.6rem 1.6rem'}; 
    & > strong {
        display: block;
        width: 100%;
        font-size: var(--mo-fz-lg); 
        color: var(--color-main-gray); 
    }
    & > span {
    display: block;
    width: 100%;
    margin-top: var(--sp-12);
    text-align: center;
    font-size: var(--mo-fz-smd); 
    color: var(--color-main-gray); 
    }
    &  .close-btn {
        position: absolute; 
        top: var(--sp-16); 
        right: var(--sp-16);
        width: var(--sp-24); 
        height: var(--sp-24);
        background: url(${imgCloseBtn}) no-repeat center;
        background-size: 100%;
    }
`;

const ContentBox = styled.div`
    display: block;
    width: 100%;
    margin-top: var(--sp-24);
`;

const TableBox = styled.div`
    display: block;
    & table {
        border-collapse: collapse; 
        width: 100%;
    }
    & table, td, th {
        border-width: 1px;
        border-style: solid;
        border-color: var(--color-main-gray-50);
        border-collapse : collapse;
        font-size: var(--mo-fz-sm);
        text-align: center;
    }
    & td, th {
        padding: var(--sp-08);
    }
    & th {
        background-color: var(--color-main-gray-45 );
    }
    & ~ & {
        margin-top: var(--sp-40);
    }
    & i[data-num]::before {
        content: "①";
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 var(--sp-02);
        color: var(--color-main-gray);
        font-size: var(--mo-fz-smd);
        font-style: normal;
    }
    & i[data-num="2"]::before {content:"②"} & i[data-num="3"]::before {content:"③"} & i[data-num="4"]::before {content:"④"}
    & i[data-num="5"]::before {content:"⑤"} & i[data-num="6"]::before {content:"⑥"} & i[data-num="7"]::before {content:"⑦"} & i[data-num="8"]::before {content:"⑧"}
    & i[data-num="9"]::before {content:"⑨"} & i[data-num="10"]::before {content:"⑩"} 

    & table[data-type="b"] th {
        background-color: transparent;
        text-align: left;
    }
    & table[data-type="b"] td {
        text-align: right;
    }
    & table[data-type="b"] .t-box {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }
    & table[data-type="b"] .t-box-sub {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
    }
    & table[data-type="b"] .t-box-sub::before {
        content: ":";
        padding-left: var(--sp-20);
    }
`;



const TotalMedicalPaidDetailBox = ({hsptlCd, patntId, clnicDt, onClose, type}) => {

    const [clnicFeeList, setClnicFeeList] = useState([]);
    const [clnicFeeInfo, setClnicFeeInfo] = useState({});

    useEffect(()=>{

        getClnicInfo();

    }, [])

    const getClnicInfo = useCallback(async () => {

        const url = "/hsptl/retrieveHsptlClnicFeeInfo";
        const jToken = localStorage.getItem('jToken');
        const reqParam = {
            hsptlCd : hsptlCd, 
            patntId : patntId,
            clnicDt : clnicDt
        }

        const reqOptions = {
            headers: {
                Authorization: jToken,
            }
            , withCredentials: true
        }

        await axiosApi.post(url, reqParam, reqOptions)
        .then((res) => {
            if (res.data.resultCode === CODE.RCV_SUCCESS) {
                const mediInfo = res.data.result;
                setClnicFeeList(mediInfo.clnicFeeList);
                setClnicFeeInfo(mediInfo.clnicFeeInfo);

                console.log("mediInfo.clnicFeeList : ", mediInfo.clnicFeeList)
            } else {
                alert(res.data.resultMessage);
            }
        })
        .catch(err => {
            console.error("사용자의료건강정보 호출 중 오류  : ", err);
        })

    }, []);


    return (
        <ContentWrap>
            <InnerBox $type={type}>
                <strong>
                    총 진료비 상세
                </strong>
                <ContentBox>
                    <TableBox>
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan={2}>항목</th>
                                    <th colSpan={3}>급여</th>
                                    <th rowSpan={2}>비급여</th>
                                </tr>
                                <tr>
                                    <td>본인부담금</td>
                                    <td>공단부담금</td>
                                    <td>전액본인부담</td>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    clnicFeeList.filter(item => item.hsptlCd !== "TOTAL").map((item, index)=>{
                                        return (
                                            <tr>
                                                <th>진찰료</th>
                                                <td>{Number(item.patntPymtCvrd).toLocaleString()}</td>
                                                <td>{Number(item.hlthInsrPymtCvrd).toLocaleString()}</td>
                                                <td>{Number(item.fullPatntPymtCvrd).toLocaleString()}</td>
                                                <td>{Number(item.noncvrd).toLocaleString()}</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    clnicFeeList.filter(item => item.hsptlCd === "TOTAL").map((item, index)=>{
                                        return (
                                            <tr>
                                                <th>합계</th>
                                                <td>{Number(item.patntPymtCvrd).toLocaleString()}</td>
                                                <td>{Number(item.hlthInsrPymtCvrd).toLocaleString()}</td>
                                                <td>{Number(item.fullPatntPymtCvrd).toLocaleString()}</td>
                                                <td>{Number(item.noncvrd).toLocaleString()}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>   
                        </table>
                    </TableBox>

                    <TableBox>
                    <table data-type="b">
                        <tbody>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="1"></i><strong>진료비 총액</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3ClnicFeeTot ?? 0).toLocaleString()}</span>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="2"></i><strong>환자부담총액</strong>
                                    </div>
                                    <div class="t-box-sub">
                                        <i data-num="1"></i><p>-(공단부담금+상한초과금)</p>
                                    </div>    
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3PatntPymtTot ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="3"></i><strong>납부할 금액</strong>
                                    </div>
                                    <div class="t-box-sub">
                                            <i data-num="2"></i>+<i data-num="4"></i>-(<i data-num="5"></i>+<i data-num="6"></i>+<i data-num="7"></i>+<i data-num="8"></i>)
                                    </div>    
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3TobePaidTot ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="4"></i><strong>부가 가치세</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3Vat ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="5"></i><strong>감면액</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3RdctnAmt ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="6"></i><strong>수혈 보상액</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3BldtsfnComptAmt ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="7"></i><strong>건강생활유지비</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3HlthLifeMntnncCost ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="8"></i><strong>지원금</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3Support ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <strong>후원금</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3Donation ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <i data-num="9"></i><strong>납부한 금액</strong>
                                    </div>
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3PaidTot ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                            <tr>
                                <th>
                                    <div class="t-box">
                                        <strong>납부하지 않은 금액</strong>
                                    </div>
                                    <div class="t-box-sub">
                                            <i data-num="3"></i>+<i data-num="9"></i>
                                    </div>    
                                </th>
                                <td>
                                    <span>{Number(clnicFeeInfo?.view3UnpaidAmt ?? 0).toLocaleString()}</span>
                                </td>  
                            </tr>
                        </tbody>   
                        </table>    
                    </TableBox>


                </ContentBox>

                
                {type !== 'normal' && (
                    <button className='close-btn' onClick={onClose}>
                        <span className='blind'>팝업 닫기</span>
                    </button>
                )}
            </InnerBox>
        </ContentWrap>
    );
};

export default TotalMedicalPaidDetailBox;