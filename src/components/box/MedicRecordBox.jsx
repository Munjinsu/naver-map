import React, { Children, useState } from 'react';
import styled from 'styled-components';
import alram_on from '../../../src/images/common/i_alram_on.svg';
import alram_off from '../../../src/images/common/i_alram_off.svg';
import i_pill from '../../../src/images/common/i_pill.svg';
import check_mark_on from '../../../src/images/common/i_check_mark_on.svg';
import check_mark_off from '../../../src/images/common/i_check_mark_off.svg';
import day_morning from '../../../src/images/common/i_day_morning_02.svg';
import day_lunch from '../../../src/images/common/i_day_lunch_02.svg';
import day_night from '../../../src/images/common/i_day_night_02.svg';

import URL from '../../constants/url';

import { Link, useNavigate } from 'react-router-dom';


// 홈케어 > 복약기록 

const RecordContent = styled.div`
    display: block;
    position: relative;
    margin-top: var(--sp-12);
`;

const InnerBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    position: relative;
    z-index: 1;
    padding: var(--sp-16);
    border-radius: var(--radius-16);
    background-color: var(--color-white);
`;

const InfomBox = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    gap: var(--sp-04);
`;

const TopBox = styled.ul`
    display: flex;
    align-items: center;
    gap: var(--sp-06);
`;

const DayChip = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp-02);
    height: var(--sp-20);
    padding: 0 var(--sp-10) 0 var(--sp-06);
    border-radius: var(--radius-100);
    background-color: var(--color-main-25);
    & > i {
        display: block;
        width: var(--sp-14);
        height: var(--sp-14);
    }
    & > span {
        font-size: var(--mo-fz-sm);
        color: var(--color-main-5);
        font-weight: var(--fz-weight-700);
    }
`;

const MealChip = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--sp-20);
    padding: 0 var(--sp-10);
    border-radius: var(--radius-100);
    background-color: var(--color-main-25);
    font-size: var(--mo-fz-sm);
    color: var(--color-main-5);
    font-weight: var(--fz-weight-700);
`;

const MidBox = styled.div`
    padding-top: var(--sp-04);
`;

const MiddBox = styled.div`
    padding-top: 0;
`;

const TypoSub = styled.div`
    & p {
        font-size: var(--mo-fz-smd);
        color: var(--color-main-gray);
        font-weight: var(--fz-weight-700);
    }
    & p.complete {
        color: var(--color-main-5);
    }
`;

const TypoDetail = styled.p`
    font-size: var(--mo-fz-sm);
    color: var(--color-main-gray-5);
    word-break: break-all;
`;


const ControlBox = styled.div`
    display: flex;
    align-items: center;
    gap: var(--sp-20);
    top: var(--sp-12);
    right: var(--sp-16);
    & .alarm-status-box {
        margin-right: 4rem;
        & span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--sp-20);
            height: var(--sp-20);
            background-image: url(${alram_off});
        }& span[data-alarm="on"] {
            background-image: url(${alram_on});
        }   
    }
    }
`;

const CtrolAlarm = styled.img`
    width: var(--sp-24);
    height: var(--sp-24);
`;

const CheckBox = styled.div`
    position: absolute;
    top: var(--sp-16);
    right: var(--sp-16);
    z-index: 2;
`;



const MedicRecordBox = ({item, num, hospital, pillName, alarmChk, chkDay, pillType, checked, onCheckChange, setNotifications}) => {

    const navigate = useNavigate();

    const [localAlarmActive, setLocalAlarmActive] = useState(item?.active);

    /* 알림 여부 온오프 함수 */
    const toggleNotification = (id) => {
        let newStatus = localAlarmActive == 'Y'  ? 'N' : 'Y';
        setLocalAlarmActive(newStatus);

        if (item) {
            item.active = newStatus;
        }

        // setNotifications(prev=>[...prev, item]);
        setNotifications(prev => 
            prev.map(notif => notif.id === item.id ? { ...notif, ...item } : notif)
        );
        
        if (window.ReactNativeWebView) {
            console.log(`알림 토글 요청: ID ${id}`);
            
            window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'TOGGLE_NOTIFICATION',
                id
            }));

        }
    };

    return (
        <RecordContent>

            <InnerBox onClick={()=> {
                pillType ? 
                  navigate(URL.PILL_DETAIL_USER, {
                    state : item
                  }) 
                : navigate(URL.PILL_DETAIL, {
                    state : item
                  })
                // console.log(JSON.stringify(item, null, 2));
            } }>

                    {checked ? (
                        <InfomBox> 
                            <MiddBox>
                                <TypoSub>
                                    <p className="complete">{pillName} {
                                            chkDay === "1" ? <span>아침약 </span>:
                                            chkDay === "2" ? <span>점심약 </span>:
                                            chkDay === "3" ? <span>저녁약 </span>:
                                         null} 복용 완료!</p>   
                                </TypoSub>
                            </MiddBox>
                        </InfomBox>    
                    ): (
                        <>
                            <InfomBox> 
                                <TopBox>
                                    <DayChip>
                                        <img src={
                                            chkDay === "1" ? `${day_morning}`:
                                            chkDay === "2" ? `${day_lunch}`:
                                            chkDay === "3" ? `${day_night}`:
                                         null
                                        } />
                                        {
                                            <span>{item?.data?.data?.selectedTime}</span>
                                         } 
                                        
                                    </DayChip>
                                    {/* <MealChip>식후 30분</MealChip> */}
                                    <MealChip>{item?.data?.data?.timing}</MealChip>
                                </TopBox>
                                <MidBox>
                                    <TypoSub>
                                        <p>{hospital} {pillName} {
                                            chkDay === "1" ? <span>아침약 </span>:
                                            chkDay === "2" ? <span>점심약 </span>:
                                            chkDay === "3" ? <span>저녁약 </span>:
                                         null} 
                                          잘 드셨나요?</p>   
                                    </TypoSub>
                                    <TypoDetail>
                                        {/* <span>우루사정 200mg 외 4개 약</span> */}
                                        {item?.data?.data?.pillList?.length > 0 && 
                                        <span>{`${item?.data?.data.pillList[0]} 외 ${item?.data?.data.pillList.length - 1}개 약`}</span>
                                        }
                                    </TypoDetail>
                                </MidBox>
                            </InfomBox>
                            {/* <div>{JSON.stringify(localAlarmActive)}</div> */}
                            {/* <div>{JSON.stringify(item)}</div> */}
                            <ControlBox onClick={(e) => e.stopPropagation()}>
                                <div className="alarm-status-box" onClick={(e) => {
                                    e.stopPropagation();
                                    toggleNotification(item?.id);
                                }}>
                                    <span data-alarm={localAlarmActive == 'Y' ? 'on' : null}></span>
                                </div>
                            </ControlBox>
                        </> 
                    )}
  
                                
            </InnerBox>
                <CheckBox>
                    <div className="chkbox-custom" data-chkbox="all-btn">
                        <input 
                            type="checkbox" 
                            id={`pill-${num}`} 
                            checked={checked} 
                            onChange={(e) => onCheckChange(num - 1, e.target.checked)}
                        />
                        <label htmlFor={`pill-${num}`}></label>
                    </div>
                </CheckBox>
                              


        </RecordContent>
    );
};

export default MedicRecordBox;
