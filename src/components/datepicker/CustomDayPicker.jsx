import React, { useState, useEffect } from "react";
 import Picker from "react-mobile-picker";

const date = new Date();

const day = date.getDate();


const CustomDatePicker = ({onClose, type, titleTxt, subTitleTxt, children}) => {
  const [value, setValue] = useState(day);
  const [dayOptions, setDayOptions] = useState(Array.from({ length: 60 }, (v, i) => i + 1));

  const selections = {
    day: dayOptions,
  };

  return (
    <div className="day-picker-wrap">

      {children}

      <strong className="picker-title">{titleTxt}</strong>
      <span>{subTitleTxt}</span>

      <div className="day-picker-box">
        <div className="picker-sub-txt">
          <span>일</span>
        </div>
        
      <Picker value={value} onChange={setValue} wheelMode="natural" className="custom-picker" style={{width: "70%"}}>
        {Object.keys(selections).map((date) => (
          <Picker.Column key={date} name={date}>
            {selections[date].map((option) => (
              <Picker.Item key={option} value={option}>
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
                      //backgroundColor: selected ? "#F2F4F8" : "white",
                      padding: "5px 20px",
                      borderRadius: "5px",
                      transition: ".25s",
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
                    <button className="btn" data-btn-type="fill-main" data-btn-size="lg" onClick={onClose}>
                        <span>선택완료</span>
                    </button>
                </div>

            </div>
    </div>  



    </div>

    
  );
};

export default CustomDatePicker;