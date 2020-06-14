import React from "react";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import maxBy from "lodash/maxBy";
import { connect } from "react-redux";

const Counter = (props) => {
  const dailyImpress = maxBy(props.dailyDataReport, "imps") || { imps: 0 };

  return (
    <Row>
      <Col sm={6} xl={3}>

        <Card className="mb-4">
          <Card.Body className="d-flex align-items-center">
            <div className="ion ion-md-globe display-4 text-primary" />
            {props.dailyDataLoading ? (
              <Spinner
                animation="border" size="sm" variant="light" className="ml-3"
              />
            ) : (
              <div className="ml-3">
                <div className="text-muted small">{dailyImpress.domain}</div>
                <div className="text-large">{dailyImpress.imps.toLocaleString()}</div>
              </div>
            )}
          </Card.Body>
        </Card>

      </Col>
    </Row>
  );
};

export default connect(
  state => ({
    dailyDataLoading: state.dashboard.dailyDataLoading,
    dailyDataReport: state.dashboard.dailyDataReport,
  }),
)(Counter);
