import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import get from "lodash/get";
import { getTags } from "src/store/actions/tags";
import { getReport } from "src/store/actions/reports";
import FilterSection from "./FilterSection";
import useNotification from "src/hook/useNotification";
import Table from "src/components/Table";
import column from "./column";
import { Card } from "react-bootstrap";

const Report = (props) => {
  const { showError } = useNotification();

  useEffect(() => {
    props.getTags();
    // eslint-disable-next-line
  }, [props.currentDomain]);

  useEffect(() => {
    if (props.error) {
      showError(props.error)
    }
    // eslint-disable-next-line
  }, [props.error]);

  const handleSubmit = (formData) => props.getReport(formData);

  return (
    <>
      <h4 className="font-weight-bold">Report</h4>
      <FilterSection onSubmit={handleSubmit} loading={props.loading} />

      <Card className="mt-4">
        <Table
          keyField="plcmntid"
          data={get(props, "report.Items") || []}
          columns={column}
          loading={props.loading}
        />
      </Card>
    </>
  );
};

export default connect(state => ({
  currentDomain: state.user.currentDomain,
  loading: state.reports.loading,
  report: state.reports.report,
  error: state.reports.error,
}), dispatch => bindActionCreators({
  getTags,
  getReport
}, dispatch))(Report);
