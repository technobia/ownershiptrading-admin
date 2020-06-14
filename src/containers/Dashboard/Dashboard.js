import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDailyDataReport,
  getDailyTagReport,
  getMonthlyDataReport
} from "src/store/actions/dashboard";
import DailyReport from "./components/DailyReport";
import MonthlyReport from "./components/MonthlyReport";

import Counter from "./components/Counters";
import DatePicker from "src/components/Form/DatePicker";
import { DATE_FORMAT } from "src/constants/date";

const Dashboard = (props) => {
  const [currentDate, setCurrentDate] = useState(moment().format(DATE_FORMAT));
  const today = moment().format("dddd, D MMMM YYYY");

  useEffect(() => {
    props.setTitle("Dashboard");
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    props.getDailyDataReport(currentDate);
    props.getDailyTagReport(currentDate);
    props.getMonthlyDataReport();
    // eslint-disable-next-line
  }, [props.currentDomain]);

  const handleChangeDate = (date) => {
    props.getDailyDataReport(date);
    props.getDailyTagReport(date);
    setCurrentDate(date)
    // eslint-disable-next-line
  };

  return (
    <div>
      <div className=" d-flex justify-content-between py-3 mb-4">
        <h4 className="font-weight-bold m-0">
          <div>
            Dashboard
            <div className="text-muted text-tiny mt-1">
              <small className="font-weight-normal">Today is {today}</small>
            </div>
          </div>
        </h4>
        <div className="d-inline-flex align-items-center">
          <span className="mr-1">Current Date:</span>
          <DatePicker value={currentDate} onChange={handleChangeDate} />
        </div>
      </div>

      <Counter />

      {props.isAdmin && (
        <MonthlyReport />
      )}

      <DailyReport currentDate={currentDate} />
    </div>
  );
};

export default connect(
  state => ({
    currentDomain: state.user.currentDomain,
    isAdmin: state.user.role === "admin"
  }),
  dispatch => bindActionCreators({
    getDailyDataReport,
    getDailyTagReport,
    getMonthlyDataReport,
  }, dispatch),
)(Dashboard);
