import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { DATE_FORMAT } from "src/constants/date";
import "src/vendor/libs/react-datepicker/react-datepicker.scss";

const DateRangePicker = ({ onChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(moment().add(5, 'days').toDate());

  function setDates({ start = startDate, end = endDate }) {
    if (moment(start).isAfter(end)) {
      end = start
    }
    setStartDate(start);
    setEndDate(end);
    if (onChange) {
      onChange({
        start: moment(start).format(DATE_FORMAT),
        end: moment(end).format(DATE_FORMAT)
      })
    }
  }

  const handleChangeStart = (start) => setDates({ start });

  const handleChangeEnd = (end) => setDates({ end });

  return (
    <div className="d-flex align-items-center">
      <div className="w-100">
        <DatePicker className="form-control"
                    selected={startDate}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleChangeStart}
                    popperPlacement={"auto-start"}
        />
      </div>
      <div className="px-2">&ndash;</div>
      <div className="w-100">
        <DatePicker className="form-control"
                    selected={endDate}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleChangeEnd}
                    popperPlacement={"auto-start"}
        />
      </div>
    </div>
  )
};

export default DateRangePicker;
