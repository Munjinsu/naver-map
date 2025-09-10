import React, { useState, useEffect, useCallback, useRef } from "react";
import SwitchBox from "../box/SwitchBox";

const getCurrentTime = () => {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes()
  };
};

const PickerColumn = ({ options, value, onChange, label }) => {
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isClickingRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const itemHeight = 50;
  
  const scrollToValue = useCallback(() => {
    if (containerRef.current && options.length > 0) {
      const index = options.findIndex(option => option === value);
      if (index !== -1) {
        isProgrammaticScrollRef.current = true;
        const scrollTop = index * itemHeight;
        containerRef.current.scrollTop = scrollTop;
        
        setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 200);
      }
    }
  }, [options, value, itemHeight]);

  useEffect(() => {
    scrollToValue();
  }, [scrollToValue]);

  const handleScroll = useCallback((e) => {
    if (!isInitialized || isClickingRef.current || isProgrammaticScrollRef.current) return;
    
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      if (isProgrammaticScrollRef.current || isClickingRef.current) return;
      
      const scrollTop = e.target.scrollTop;
      const index = Math.round(scrollTop / itemHeight);
      const selectedValue = options[index];
      
      if (selectedValue !== undefined && selectedValue !== value) {
        onChange(selectedValue);
      }
    }, 200);
  }, [isInitialized, options, value, onChange, itemHeight]);

  const handleItemClick = useCallback((selectedValue) => {
    if (selectedValue !== value && !isClickingRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      isClickingRef.current = true;
      isProgrammaticScrollRef.current = true;
      
      onChange(selectedValue);
      
      setTimeout(() => {
        isClickingRef.current = false;
      }, 500);
      
      setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 300);
    }
  }, [value, onChange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToValue();
      setTimeout(() => {
        setIsInitialized(true);
      }, 1500);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [scrollToValue]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="picker-column" style={{ 
      height: '250px', 
      overflow: 'hidden', 
      position: 'relative',
      flex: 1
    }}>
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: '100%',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          paddingTop: '100px',
          paddingBottom: '100px',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }}
        className="picker-scroll-container"
      >
        {options.map((option, index) => {
          const isSelected = option === value;
          return (
            <div
              key={`${label}-${option}`}
              onClick={() => handleItemClick(option)}
              style={{
                height: `${itemHeight}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                scrollSnapAlign: 'center',
                color: isSelected ? "#10141A" : "#D2D6DC",
                fontSize: isSelected ? "24px" : "18px",
                fontWeight: "700",
                padding: "5px 20px",
                borderRadius: "5px",
                transition: "all 0.25s ease",
                userSelect: 'none'
              }}
            >
              {option}
            </div>
          );
        })}
      </div>
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '0',
        right: '0',
        height: `${itemHeight}px`,
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        borderTop: '1px solid rgba(16, 20, 26, 0.1)',
        borderBottom: '1px solid rgba(16, 20, 26, 0.1)',
        backgroundColor: 'rgba(242, 244, 248, 0.3)'
      }} />
    </div>
  );
};

const CustomTimePicker = ({
  onClose, 
  type, 
  titleTxt, 
  subTitleTxt, 
  children, 
  preDismiss2, 
  onConfirm, 
  reAlarm
}) => {
  const [reSwichStatus, setReSwichStatus] = useState(false);
  const [pickerValue, setPickerValue] = useState(getCurrentTime);

  const hourOptions = Array.from({ length: 24 }, (_, i) => i);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  const handleHourChange = useCallback((hour) => {
    setPickerValue(prev => ({ ...prev, hour }));
  }, []);

  const handleMinuteChange = useCallback((minute) => {
    setPickerValue(prev => ({ ...prev, minute }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
        onConfirm({
        ...pickerValue,
        reAlrmAt: reSwichStatus ? '1' : '0', // 재알람여부 콜백
      });
    } else {
      onClose?.();
    }
  }, [onConfirm, pickerValue, onClose, reSwichStatus]);

  const handleCancel = useCallback(() => {
    const cancelHandler = onClose || preDismiss2;
    cancelHandler?.();
  }, [onClose, preDismiss2]);

  return (
    <div className="time-picker-wrap">
      {type && children}

      <strong className="picker-title">{titleTxt}</strong>
      <span>{subTitleTxt}</span>
     
      <div className="time-picker-box">
        <div className="picker-sub-txt">
          <span>시</span>
          <span>분</span>
        </div>

        <div style={{
          display: 'flex',
          position: 'relative'
        }}>
          <PickerColumn 
            options={hourOptions}
            value={pickerValue.hour}
            onChange={handleHourChange}
            label="hour"
          />
          <PickerColumn 
            options={minuteOptions}
            value={pickerValue.minute}
            onChange={handleMinuteChange}
            label="minute"
          />
        </div>

        {reAlarm && (
          <div className="re-alarm-box">
            <p className="tit">다시 알림 설정</p>
            <SwitchBox size="small" toggles={reSwichStatus} status={setReSwichStatus}/>
          </div>
        )}
      </div>

      <div className="bottom-box" style={{width:"100%"}}>
        <div className="inner-box">
          <div className='btn-layout' data-btn-num="2"> 
            <button 
              className="btn" 
              data-btn-type="outline-main" 
              data-btn-size="lg" 
              onClick={handleCancel}
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

      <style jsx>{`
        .picker-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomTimePicker;