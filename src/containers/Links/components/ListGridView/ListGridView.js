import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Tooltip from "src/components/Tooltip";
import styles from "./ListGridView.module.scss";
import Loader from "src/shared/Loader";

const ListGridView = (props) => {
  return props.loading ? (
    <Loader />
  ) : (
    <Row>
      {props.collections.map(item => (
        <Col md={4} key={item.tag_id}>
          <Card>
            <Card.Body>
              <h6 className="d-flex align-items-center justify-content-between mb-0">
                <span>Tag ID: {item.tag_id}</span>
                <div className={styles.actions}>
                  <Tooltip title="Edit">
                    <Button variant="default icon-btn" size="sm" disabled onClick={() => console.log("edit")}>
                      <span className="ion ion-md-create"/>
                    </Button>
                  </Tooltip>

                  <Tooltip title="Duplicate">
                    <Button variant="default icon-btn" size="sm" disabled onClick={() => console.log("duplicate")}>
                      <span className="ion ion-ios-copy"/>
                    </Button>
                  </Tooltip>

                  <Tooltip title="Report">
                    <Button variant="default icon-btn" size="sm" onClick={() => props.onRedirectToReport(item)}>
                      <span className="ion ion-ios-list-box text-info"/>
                    </Button>
                  </Tooltip>

                  <span className="text-lighter ml-2 mr-2">|</span>

                  <Tooltip title="Remove">
                    <Button variant="default icon-btn" size="sm" disabled onClick={() => console.log("remove")}>
                      <span className="ion ion-md-trash text-danger"/>
                    </Button>
                  </Tooltip>
                </div>
              </h6>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
};

export default connect(state => ({
  loading: state.tags.getting,
  collections: state.tags.collections
}))(ListGridView);
