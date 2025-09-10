import React, { useState, useEffect } from 'react';
import SwitchBox from './SwitchBox';
import styled from 'styled-components';
import imgDay01 from '../../images/common/i_day_morning_02.svg';
import imgDay02 from '../../images/common/i_day_lunch_02.svg';
import imgDay03 from '../../images/common/i_day_night_02.svg';
import CustomTimePicker from '../datepicker/CustomTimePicker';
import style from '../../pages/user/totalmenu/appsetting/RecordSettingDetail.module.css';

//bottom sheet
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';



// 기록 설정 > 알람 시간 설정


const AlarmListBox = styled.div`
    display: block;
    margin-top: var(--sp-20);
    & > ul {
        display: flex;
        flex-direction: column;
        gap: var(--sp-20 );
    }
`;

const HeadBox = styled.div`
    display: flex; 
    align-items: center; 
    justify-content: space-between;
`;

const ControlBox = styled.div`
    display: flex; 
    align-items: center;
    gap: var(--sp-12);
    & > span {
        font-size: var(--mo-fz-md);
        color: var(--color-black); 
        font-weight: var(--fz-weight-700);
    }
    & > .no-alarm {
        color: var(--color-main-gray-30); 
    }

`;

const DayBox = styled.div`
    display: flex; 
    align-items: center; 
    gap: var(--sp-04);
    & span {
        display: flex; 
        align-items: center; 
        gap: var(--sp-04); 
        height: var(--sp-18); 
        padding: 0 var(--sp-08); 
        border-radius: var(--radius-100); 
        background-color: var(--color-main-25); 
        font-size: 1.1rem; 
        color: var(--color-main-5); 
        font-weight: var(--fz-weight-700);
        &[data-day] {
            padding: 0 var(--sp-08) 0 var(--sp-06);
        }
        &[data-day]::before {
            content: ""; 
            display: block; 
            width: var(--sp-12); 
            height: var(--sp-12); 
            background: url(${imgDay01}) no-repeat center; transform: scale(1.2);
        }
        &[data-day="2"]::before {
            background: url(${imgDay02}) no-repeat center;
        }
        &[data-day="3"]::before {
            background: url(${imgDay03}) no-repeat center;
        }        
    }
`;

const DateBox = styled.span`
    font-size: var(--mo-fz-sm); 
    color: var(--color-main-gray-5);
`;


const RecordAlarmSettingBox = ({ dayType, dayLabel, subtitle, time, isOn, period, totDays, handleConfirmTime, handleSwitchChange, alarmTimeOpen, onDismiss}) => {
    // 시간을 '오전/오후 HH:MM' 형식으로 변환하는 함수
    const formatTime = (timeStr) => {
        // timeStr 값이 유효하지 않으면 빈 문자열 반환
        if (!timeStr || timeStr.length < 4) {
            return ""; 
        }

        // 시간과 분 추출
        const hour = parseInt(timeStr.substring(0, 2), 10);
        const minute = timeStr.substring(2, 4);

        // 오전/오후 결정
        const period = hour >= 12 ? '오후' : '오전';

        // 12시간 형식으로 변환
        let displayHour = hour % 12;
        if (displayHour === 0) {
            displayHour = 12; // 0시는 오전 12시, 12시는 오후 12시로 표시
        }

        // '0'을 붙여 두 자리로 만듦
        const formattedHour = String(displayHour).padStart(2, '0');

        return `${period} ${formattedHour}:${minute}`;
    };
    return (
        <>

           <AlarmListBox>
                <HeadBox>
                <DayBox>
                    <span data-day={dayType}>{dayLabel}</span>
                    {subtitle?.trim() && subtitle.trim().toLowerCase() !== 'null' && (
                        <span>{subtitle.trim()}</span>
                    )}
                </DayBox>
                <ControlBox>
                    {isOn && time ? (
                    <span>
                        {(() => {
                            return `${formatTime(time)}`;
                        })()}
                    </span>
                    ) : (
                    <span className="no-alarm">알림 없음</span>
                    )}
                    <SwitchBox toggles={isOn} status={handleSwitchChange} />
                </ControlBox>
                </HeadBox>
                <DateBox>{period} <b>({totDays}일)</b></DateBox>
            </AlarmListBox>

            {/* BottomSheet 내부에서 시간 선택 */}
            <BottomSheet
                scrollLocking={false} // 내부 스크롤을 위해 BottomSheet 스크롤 잠금 해제
                expandOnContentDrag={false} // 내용 드래그로 확장 방지
                open={alarmTimeOpen}
                onDismiss={onDismiss}
                snapPoints={({ minHeight }) => minHeight}
                blocking={true}
            >
                <CustomTimePicker
                type="record" 
                titleTxt="알림 시간을 선택해주세요" 
                subTitleTxt="복약 기간동안 설정한 시간에 복약 알림이 울립니다." 
                onClose={onDismiss}
                onConfirm={handleConfirmTime}
                reAlarm
                > 

                <div className={style['picker-top-box']} data-type='b'>
                                                    
                    <div className={style['record-hisyory-list']} data-type="b">
                        <div className={style['top-box']}>
                            <span data-day={dayType}>{dayLabel}</span>  
                            {subtitle?.trim() && subtitle.trim().toLowerCase() !== 'null' && (
                                <span>{subtitle.trim()}</span>
                            )}
                        </div>
                        <div className={style['bot-box']}>
                            <span>{period} <b>({totDays}일)</b></span>
                        </div>
                    </div>
                </div>
                </CustomTimePicker> 

            </BottomSheet>

        </>
    );
};

export default RecordAlarmSettingBox;
