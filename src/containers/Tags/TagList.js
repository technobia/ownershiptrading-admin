import React, { useEffect } from "react";
import Table from "src/components/Table";
import { Button, Card } from "react-bootstrap";
import columnFactory from "./columns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTags } from "src/store/actions/tags";

const TagList = (props) => {
  useEffect(() => {
    props.getTags();
    // eslint-disable-next-line
  }, [props.currentDomain]);

  const onClickAddTag = () => props.history.push("/tags/add");

  const onClickEdit = (id) => props.history.push(`/tags/edit/${id}`);

  const columns = columnFactory({
    onClickEdit
  });

  return (
    <>
      <h4 className="font-weight-bold">Tag List</h4>
      <div className="mb-3">
        <Button color="primary" onClick={onClickAddTag}>Add Tag</Button>
      </div>
      <Card>
        <Table
          keyField="tag_id"
          data={props.collections}
          columns={columns}
          loading={props.loading}
        />
      </Card>
    </>
  );
};

export default connect(state => ({
  currentDomain: state.user.currentDomain,
  loading: state.tags.getting,
  collections: state.tags.collections
}), dispatch => bindActionCreators({
  getTags
}, dispatch))(TagList);
