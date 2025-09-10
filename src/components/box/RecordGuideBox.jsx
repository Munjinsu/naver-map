import React from 'react';
import styled from 'styled-components';
import imgCloseBtn from '../../images/common/i_close_btn.svg';

//기록 가이드 컨퍼넌트 (혈압/ 혈당/ 체질량)

const ContentWrap = styled.div`
    display: block;
`;

const InnerBox = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    justify-content: center; 
    padding: 2rem 1.6rem 1.6rem; 
    & > strong {
        display: block;
        width: 100%;
        padding-bottom: 1rem;
        border-bottom: 1px solid #E2E6EC;
        font-size: 1.6rem; 
        color: #10141A; 
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
    margin-top: 1rem;
`;

const ListBox = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const List = styled.li`
    display: flex;
    align-items: flex-start;
    gap:10px;
    padding: 0 10px;
    &::before {
        content:""; 
        display:block;
        flex-shrink: 0;
        width:3px; 
        height:3px; 
        border-radius:50%;
        background-color:#4C5258;
        transform: translateY(8px);
    }
        & > p {
        font-size:14px;
        }
`;

const BottomBox = styled.div`
    display: block;
    width: 100%;
    & button {
        width: 100%;
        margin-top: var(--sp-40);
    }
`;

const TableBox = styled.div`
    display: block;
    margin-top: var(--sp-10);
    & strong {
        display: block;
        margin-bottom: var(--sp-10);
        font-size: var(--mo-fz-md); 
        color: var(--color-main-gray); 

        & span {
            font-size: var(--mo-fz-sm); 
            font-weight: var(--fz-weight-400);
        }
    }
    & table {
        border-collapse: collapse; 
        width: 100%;
    }
    & table, td, th {
        border-collapse : collapse;
        font-size: 10px;
        color: var(--color-main-gray);
        text-align: center;
    }
    & td, th {
        border: 1px solid var(--color-main-gray-50);
        padding: var(--sp-06);
    }
    & thead th {
        background-color: var(--color-main-gray-45 );
        font-size: 11px;
            &:first-child {
                border-left: none;        
            }
            &:last-child {
                border-right: none;        
            }    
    }
    & tbody th {
        font-size: 11px;
        font-weight: var(--fz-weight-700);
        &:first-child {
            border-left: none;        
        }
    }
    & tbody td {
        &:last-child {
            border-right: none;        
        }    
    }
    
`;    

 

const RecordGuideBox = ({onClose, code}) => {

    return (
        <ContentWrap>
            <InnerBox>
                <strong>
                {
                  (code === '1') ? "혈압 기록 가이드"
                : (code === '2') ? "체질량 기록 가이드"
                : "혈당 기록 가이드"
                }
                    
                </strong>

                <ContentBox>

                    {/* 혈압 기록 가이드 */}
                    {code === '1' ? (
                        <>
                            <ListBox>
                                <List>
                                    <p>고혈압이란 위 팔에 혈압대를 감아 측정한 동맥의 압력을 기준으로 수축기혈압 140 mmHg 이상, 또는 이완기혈압(확장기혈압) 90 mmHg 이상인 경우를 말합니다. 수축기혈압과 이완기혈압 모두 120 mmHg와 80 mmHg 미만일 때 정상 혈압이라고 합니다.</p>
                                </List>
                            </ListBox>

                            <TableBox>
                                <table>
                                    <colgroup>
                                        <col width={"15%"} />                                                                
                                        <col width={"25%"} />                                                                
                                        <col width={"25%"} />                                                                
                                        <col width={"auto"} />                                                                
                                    </colgroup>
                                    <thead>

                                        <tr>
                                            <th>구분</th>
                                            <th>수축기 (상압)</th>
                                            <th>이완기 (하압)</th>
                                            <th>설명</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>정상</th>
                                            <td>120 미만</td>
                                            <td>80 미만</td>
                                            <td>이상적 혈압</td>
                                        </tr>
                                        <tr>
                                            <th>주의</th>
                                            <td>120 ~ 139</td>
                                            <td>80 ~ 89</td>
                                            <td>고혈압 전단계 / 주의 필요</td>
                                        </tr>
                                        <tr>
                                            <th>위험</th>
                                            <td>140 이상</td>
                                            <td>90 이상</td>
                                            <td>고혈압</td>
                                        </tr> 
                                    </tbody>   
                                </table>
                            </TableBox>
                        </>
                    ): (
                       
                        code === '2' ? (
                            <>
                                <ListBox>
                                    <List>
                                        <p>우리나라의 비만 기준: 성인 비만의 기준은 체질량지수 25 kg/㎡ 이상입니다.</p>
                                    </List>
                                    <List>
                                        <p>체질량 지수 25.0 ~ 29.9 kg/㎡를 1단계 비만, 30.0 ~ 34.9 kg/㎡를 2단계 비만, 35.0 kg/㎡ 이상을 3단계 비만(고도 비만)으로 구분합니다.</p>
                                    </List>
                                </ListBox>

                                <TableBox>
                                    <table>
                                        <colgroup>
                                            <col width={"15%"} />                                                                
                                            <col width={"30%"} />                                                                
                                            <col width={"auto"} />                                                                
                                        </colgroup>
                                        <thead>

                                            <tr>
                                                <th>구분</th>
                                                <th>범위</th>
                                                <th>설명</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>저체중</th>
                                                <td>18.5 미만</td>
                                                <td> - </td>
                                            </tr>
                                            <tr>
                                                <th>정상</th>
                                                <td>18.5 ~ 22.9</td>
                                                <td>건강한 체중</td>
                                            </tr>
                                            <tr>
                                                <th>주의</th>
                                                <td>23.0 ~ 24.9</td>
                                                <td>과체중 (비만 전 단계)</td>
                                            </tr> 
                                            <tr>
                                                <th>위험</th>
                                                <td>25.0 이상</td>
                                                <td>비만 (1단계 이상)</td>
                                            </tr> 
                                        </tbody>   
                                    </table>
                                </TableBox>
                            </>
                        ) : 
                            <>
                                <ListBox>
                                    <List>
                                        <p>혈당은 공복, 식후에 따라 계속 달라지므로 한 시점의 수치만 가지고는 당뇨병을 진단 할 수 없습니다. 8시간 공복후의 혈당 포도당이 126mg/dL 이상이거나, 75g 경구포도당부하시간 후 혈장 포도당이 200mg/dL이거나, 또는 2~3개월간의 평균 혈당을 확인할 수 있는 당화혈색소 검사에서 6.5% 이상인 경우를 당뇨병으로 진단할 수 있습니다.</p>
                                    </List>
                                    <List>
                                        <p>그 밖에 전형적인 당뇨병의 증상(다뇨, 다음, 체중감소 등)이 있으면서 무작위 혈장 포도당이 200mg/dL이상이면 당뇨병을 진단할 수 있습니다.</p>
                                    </List>
                                     <List>
                                        <p>따라서 일반적인 건강검진에서 공복혈당 검사만으로 수치가 126mg/dL 미만이라고 해서 안심할 수는 없으므로 의심되는 경우 더 자세한 검사를 진행해야 합니다.</p>
                                    </List>
                                </ListBox>

                                <TableBox> 
                                    <strong>공복 혈당 기준</strong>
                                    <table>
                                        <colgroup>
                                            <col width={"15%"} />                                                                
                                            <col width={"30%"} />                                                                
                                            <col width={"auto"} />                                                                
                                        </colgroup>
                                        <thead>

                                            <tr>
                                                <th>구분</th>
                                                <th>범위</th>
                                                <th>설명</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>정상</th>
                                                <td>60 ~ 100</td>
                                                <td>공복 시 정상 범위</td>
                                            </tr>
                                            <tr>
                                                <th>주의</th>
                                                <td>101 ~ 125</td>
                                                <td>공복혈당장애(당뇨 전단계)</td>
                                            </tr>
                                            <tr>
                                                <th>위험</th>
                                                <td>126 초과</td>
                                                <td>당뇨병 의심 (진단 필요)</td>
                                            </tr> 
                                        </tbody>   
                                    </table>
                                </TableBox>

                                <TableBox> 
                                    <strong>식후 혈당 기준 <span>(식사 2시간 이후 기준)</span></strong>
                                    <table>
                                        <colgroup>
                                            <col width={"15%"} />                                                                
                                            <col width={"30%"} />                                                                
                                            <col width={"auto"} />                                                                
                                        </colgroup>
                                        <thead>

                                            <tr>
                                                <th>구분</th>
                                                <th>범위</th>
                                                <th>설명</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>정상</th>
                                                <td>90 ~ 139</td>
                                                <td>정상 범위</td>
                                            </tr>
                                            <tr>
                                                <th>주의</th>
                                                <td>140 ~ 199</td>
                                                <td>내당능장애</td>
                                            </tr>
                                            <tr>
                                                <th>위험</th>
                                                <td>200 ~</td>
                                                <td>당뇨병 의심 (진단 필요)</td>
                                            </tr> 
                                        </tbody>   
                                    </table>
                                </TableBox>  
                            </> 
                    
                        )}


                </ContentBox>

                <BottomBox>
                                
                        <button className="btn" data-btn-type="fill-main" data-btn-size="lg" onClick={onClose}>
                            <span>확인</span>
                        </button>
                                
                    </BottomBox>

                <button className='close-btn' onClick={onClose}>
                    <span className='blind'>팝업 닫기</span>
                </button>
            </InnerBox>
        </ContentWrap>
    );
};

export default RecordGuideBox;