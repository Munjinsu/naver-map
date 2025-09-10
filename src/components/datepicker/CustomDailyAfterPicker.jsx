import React, { useState } from "react";
import Picker from "react-mobile-picker";

const mealOptions = ["공복", "식후"];

const CustomDailyAfterPicker = ({
  onClose,
  titleTxt = "섭취 시간 선택",
  onConfirm,
}) => {
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[0]);
  

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm({ meal: selectedMeal});
    } else {
      onClose?.();
    }
  };

  return (
    <div className="time-picker-wrap" >
      <strong className="picker-title">{titleTxt}</strong>
      
      <div className="time-picker-box" style={{marginTop: "8px", marginBottom: "10px"}}>
        <Picker
          value={{ meal: selectedMeal }}
          onChange={(v) => setSelectedMeal(v.meal)}
          height={100}           // 전체 높이
          itemHeight={40}        // 아이템 하나의 높이
        >
          <Picker.Column name="meal">
            {mealOptions.map((option) => (
              <Picker.Item key={option} value={option}>
                {({ selected }) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      color: selected ? "#10141A" : "#D2D6DC",
                      fontSize: selected ? "24px" : "18px",
                      fontWeight: "700",
                      padding: "0px 20px",
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
        </Picker>

      </div>

      <div className="bottom-box" style={{ width: "100%" }}>
        <div className="inner-box">
          <div className="btn-layout" data-btn-num="2">
            <button
              className="btn"
              data-btn-type="outline-main"
              data-btn-size="lg"
              onClick={onClose}
            >
              <span>취소</span>
            </button>
            <button
              className="btn"
              data-btn-type="fill-main"
              data-btn-size="lg"
              onClick={handleConfirm}
            >
              <span>선택완료</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDailyAfterPicker;
