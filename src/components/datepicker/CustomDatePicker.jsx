import React, { useState, useEffect } from "react";
import Picker from "react-mobile-picker";

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

// 윤년을 확인하는 함수
const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 각 달의 최대 일수 계산 함수
const getMaxDays = (year, month) => {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  }
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
};

const CustomDatePicker = ({onClose, type, titleTxt, subTitleTxt, nextOpen, children, onConfirm}) => {
  const [value, setValue] = useState({ year, month, day });
  const [dayOptions, setDayOptions] = useState(Array.from({ length: 31 }, (v, i) => i + 1));

  // year 또는 month가 변경되면 해당 달에 맞는 day 배열 업데이트
  useEffect(() => {
    const maxDays = getMaxDays(value.year, value.month);
    setDayOptions(Array.from({ length: maxDays }, (v, i) => i + 1));

    // 선택된 day가 현재 달의 최대 일수를 넘으면 day를 최대값으로 설정
    if (value.day > maxDays) {
      setValue((prevValue) => ({ ...prevValue, day: maxDays }));
    }
  }, [value.year, value.month]);

  const selections = {
    year: Array.from({ length: 24 }, (v, i) => i + Number(year) - 12),
    month: Array.from({ length: 12 }, (v, i) => i + 1),
    day: dayOptions,
  };


   const handleConfirm = () => {
    const selectedDate = new Date(value.year, value.month - 1, value.day);
    onConfirm && onConfirm(selectedDate);
    nextOpen && nextOpen();
    onClose && onClose();
  };


  return (
    <div className="date-picker-wrap">

      {type ? children : null}

      <strong className="picker-title">{titleTxt}</strong>
      <span>{subTitleTxt}</span>

      <div className="date-picker-box">
        <div className="picker-sub-txt">
          <span>년</span>
          <span>월</span>
          <span>일</span>
        </div>
        
      <Picker value={value} onChange={setValue} wheelMode="natural" className="custom-picker" style={{width: "70%"}}>
        {Object.keys(selections).map((date) => (
          <Picker.Column key={date} name={date}>
            {selections[date].map((option) => (
              <Picker.Item key={`${date}-${option}`}  value={option}>
                {({ selected }) => (
                  <div
                    style={{
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      width:"100%",
                      borderRadius:"0",
                      color: selected ? "#10141A" : "#D2D6DC",
                      fontSize: selected ? "24px" : "18px",
                      fontWeight: "700",
                    //  backgroundColor: selected ? "#F2F4F8" : "white",
                      padding: "5px 20px",
                      borderRadius: "5px",
                      transition: "color .25s",
                    }}
                  >
                    {option}
                  </div>
                )}
              </Picker.Item>
            ))}
          </Picker.Column>
        ))}
      </Picker>
      </div>

      <div className="bottom-box" style={{width:"100%"}}>
          <div className="inner-box">

                  {/* 버튼이 1개일때     */}
                {/* <div className='btn-layout' data-btn-num="1"> 
                    <button className="btn" data-btn-type="fill-main" data-btn-size="lg">
                        <span>다음</span>
                    </button>
                </div> */}
                

                  {/* 버튼이 2개일때  */}
                  <div className='btn-layout' data-btn-num="2"> 
                    <button className="btn" data-btn-type="outline-main" data-btn-size="lg" onClick={onClose}>
                        <span>취소</span>
                    </button>
                    <button className="btn" data-btn-type="fill-main" data-btn-size="lg" onClick={handleConfirm}> 
                        <span>선택완료</span>
                    </button>
                </div>

            </div>
    </div>  



    </div>

    
  );
};

export default CustomDatePicker;