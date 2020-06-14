import React, { useEffect, useState } from "react";
import RcDatePicker from "react-datepicker";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { DATE_FORMAT } from "src/constants/date";
import "src/vendor/libs/react-datepicker/react-datepicker.scss";

const DatePicker = ({ value, onChange, ...props }) => {
  const [date, setDate] = useState();

  useEffect(() => {
    if (!isEmpty(value)) {
      setDate(new Date(value))
    }
    // eslint-disable-next-line
  }, [value]);

  const handleOnChange = (date) => {
    if (onChange) {
      onChange(moment(date).format(DATE_FORMAT))
    }
  };

  return (
    <RcDatePicker
      placeholder={DATE_FORMAT}
      className="form-control"
      selected={date}
      onChange={handleOnChange}
      withPortal
      todayButton={"Today"}
      {...props}
    />
  )
};

export default DatePicker;
