import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import TagForm from "../TagForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTagDetail } from "src/store/actions/tags";
import { getCreatives } from "src/store/actions/creatives";
import Loader from "src/shared/Loader";

const TagEdit = (props) => {
  const id = props.match.params.tagId;

  useEffect(() => {
    props.getCreatives();
    props.getTagDetail(id);
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data) => console.log(data);

  return (
    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        {props.loading && (<Loader />)}
        <h4 className="font-weight-bold">Tag Edit</h4>
        <TagForm onSubmit={onSubmit} detail={props.detail} isEdit />
      </Col>
    </Row>
  );
};

export default connect(
  state => ({
    currentDomain: state.user.currentDomain,
    loading: state.tags.getTagDetailLoading,
    detail: state.tags.detail,
  }),
  dispatch => bindActionCreators({
    getCreatives,
    getTagDetail,
  }, dispatch),
)(TagEdit);
