import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // CSS 파일 import

function OndatePicker() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        isClearable
        placeholderText=""
        className="datepicker"
      />
    </>
  );
}

export default OndatePicker;