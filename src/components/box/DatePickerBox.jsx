import {ko} from "date-fns/locale";
import DatePicker from "react-datepicker";
import React, {useEffect, useState} from "react";
import { format } from 'date-fns';
import {parseDateString} from "../../assets/js/cmn";

import "react-datepicker/dist/react-datepicker.css";


const DateRangePickerBox = (props) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(()=>{
        setStartDate(new Date(parseDateString(props.startDate)));
        setEndDate(new Date(parseDateString(props.endDate)));
    },[props])

    return (
        <div className="DateRangePickerBox">
            <div className="date__wrap h_44">
                <DatePicker
                    locale={ko}
                    name="startData"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="yyyy-MM-dd"
                    maxDate={endDate} // maxDate 이후 날짜 선택 불가
                    selectsStart
                    shouldCloseOnSelect
                    showIcon
                    onChange={(date) => {
                        if(date) {
                            props.onChangeStartDate(format(date, 'yyyyMMdd'));
                            setStartDate(date);
                        }
                    }}
                />
            </div>
            <em className="data">~</em>
            <div className="date__wrap h_44">
                <DatePicker
                    locale={ko}
                    name="endDate"
                    dateFormat="yyyy-MM-dd"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    selectsEnd
                    shouldCloseOnSelect
                    showIcon
                    onChange={(date) => {
                        if(date) {
                            props.onChangeEndDate(format(date, 'yyyyMMdd'));
                            setEndDate(date);
                        }
                    }}
                />
            </div>
        </div>
    );
};

const DatePickerBox = (props) => {

    const [selectDate, SetSelectDate] = useState(new Date(props.date));

    return (
        <div>
            <DatePicker
                locale={ko}
                name="date"
                selected={selectDate}
                dateFormat="yyyy-MM-dd"
                shouldCloseOnSelect
                showIcon
                onChange={(date) => {
                    if(date) {
                        props.onChangeDate(format(date, 'yyyyMMdd'));
                        SetSelectDate(date);
                    }
                }}
            />
        </div>
    );
};

const YearPickerBox = (props) => {

    const [selectYear, setSelectYear] = useState(null);

    useEffect(()=>{
        setSelectYear(new Date(props.date));
    },[props])

    return (
        <div className="date__wrap h_44">
            <DatePicker
                locale={ko}
                name="date"
                selected={selectYear}
                dateFormat="yyyy"
                showYearPicker
                shouldCloseOnSelect
                showIcon
                onChange={(date) => {
                    props.onChangeDate(format(date, 'yyyy'));
                    setSelectYear(date);
                }}
            />
        </div>
    )
}

export {
    DateRangePickerBox,
    DatePickerBox,
    YearPickerBox
};