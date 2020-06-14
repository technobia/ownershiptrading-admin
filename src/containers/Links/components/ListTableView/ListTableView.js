import React from "react";
import Table from "src/components/Table";
import columnFactory from "./columns";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";

const ListTableView = (props) => {
  const columns = columnFactory({
    onRedirectToReport: props.onRedirectToReport
  });

  return (
    <Card>
      <Table
        keyField="tag_id"
        data={props.collections}
        columns={columns}
        loading={props.loading}
      />
    </Card>
  );
};

export default connect(state => ({
  loading: state.tags.getting,
  collections: state.tags.collections
}))(ListTableView);

