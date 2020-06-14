import React, { useEffect } from "react";
import TagForm from "../TagForm";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCreatives } from "src/store/actions/creatives";
import { saveTag, resetSaveTag } from "src/store/actions/tags";

const TagAdd = (props) => {
  useEffect(() => {
    props.getCreatives();
    // eslint-disable-next-line
  }, [props.currentDomain]);

  useEffect(() => {
    if (props.saveSuccess) {
      props.resetSaveTag();
      props.history.push("/tags")
    }
    // eslint-disable-next-line
  }, [props.saveSuccess]);

  const onSubmit = (data) => props.saveTag(data);

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <h4 className="font-weight-bold">Tag Add</h4>
        <TagForm onSubmit={onSubmit}/>
      </Col>
    </Row>
  )
};

export default connect(
  state => ({
    currentDomain: state.user.currentDomain,
    saveSuccess: state.tags.saveSuccess,
  }),
  dispatch => bindActionCreators({
    getCreatives,
    saveTag,
    resetSaveTag
  }, dispatch)
)(TagAdd);
