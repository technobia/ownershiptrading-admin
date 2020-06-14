import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { connect } from "react-redux";
import Table from "src/components/Table";
import columnData from "./columnData";
import columnTag from "./columnTag";

const paginationOptions = {
  sizePerPageList: [
    { text: "50", value: 50 },
    { text: "100", value: 100 },
  ]
};

const DailyReport = (props) => {
  const titleDaily = `Data Report${props.currentDate ? ` (${props.currentDate})` : ""}`;
  const titleTagDaily = `Tag Report${props.currentDate ? ` (${props.currentDate})` : ""}`;

  return (
    <div className="nav-tabs-top mb-4">
      <Tabs defaultActiveKey="sale-stats">
        {props.isAdmin && (
          <Tab eventKey="sale-stats" title={titleDaily}>
            <Table
              loading={props.dailyDataLoading}
              keyField="domain"
              data={props.dailyDataReport}
              columns={columnData}
              paginationOptions={paginationOptions}
              filter
              defaultSorted={[{
                dataField: "imps",
                order: "desc"
              }]}
            />
          </Tab>
        )}

        <Tab eventKey="latest-sales" title={titleTagDaily}>
          <Table
            loading={props.dailyTagLoading}
            keyField="tid"
            data={props.dailyTagReport}
            columns={columnTag}
            paginationOptions={paginationOptions}
            filter
            defaultSorted={[{
              dataField: "imps",
              order: "desc"
            }]}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default connect(
  state => ({
    dailyDataLoading: state.dashboard.dailyDataLoading,
    dailyDataReport: state.dashboard.dailyDataReport,
    dailyTagLoading: state.dashboard.dailyTagLoading,
    dailyTagReport: state.dashboard.dailyTagReport,
    isAdmin: state.user.role === "admin"
  }),
)(DailyReport);
