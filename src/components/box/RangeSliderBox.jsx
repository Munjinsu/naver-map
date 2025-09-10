import React from 'react';
import Slider from '@mui/material/Slider';

// 홈케어 > 오늘의 할일 > 건강기록 > 기록하기 척도 



function RangeSliderBox({ value, onChange, maxValue = 10 }) {

  const MAX = Number(maxValue);
  const MIN = 0;
  const marks = [
    {
      value: MIN,
      label: '0',
    },
    {
      value: MAX,
      label: maxValue,
    },
  ];


    return (
        <>
            <Slider
                marks={marks}
                aria-label="Always visible"
                value={value}
                onChange={(e, newValue) => onChange(newValue)}
                defaultValue={0}
                step={1}
                valueLabelDisplay="on"
                min={MIN}
                max={MAX}
            />
        </>
    );
}

export default RangeSliderBox;


