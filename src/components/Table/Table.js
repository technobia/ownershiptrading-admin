import React from "react";
import PropTypes from "prop-types";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "src/vendor/libs/react-bootstrap-table2/react-bootstrap-table2.scss";
import styles from "./Table.module.scss";
import { Spinner } from "src/shared/Loader/Loader";
import filterFactory from "react-bootstrap-table2-filter";

const defaultPaginationOptions = {
  sizePerPageList: [
    { text: "25", value: 25 },
    { text: "50", value: 50 },
    { text: "100", value: 100 },
  ]
};

const EmptyResult = (props) => (
  <div className={styles.noResult}>{props.loading ? <Spinner /> : "No Result found"}</div>
);

const Table = ({ keyField, data, columns, loading, filter, ...props }) => {
  const paginationOptions = props.paginationOptions || defaultPaginationOptions;
  return (
    <ToolkitProvider
      keyField={keyField}
      data={loading ? [] : data}
      columns={columns}
      bootstrap4
      search
    >
      {tableProps => (
        <BootstrapTable
          {...tableProps.baseProps}
          noDataIndication={() => <EmptyResult loading={loading} />}
          wrapperClasses="table-responsive react-bs-table-card"
          classes="card-table table-striped border-top"
          pagination={paginationFactory(paginationOptions)}
          filter={filter ? filterFactory() : undefined}
          {...props}
        />
      )}
    </ToolkitProvider>
  );
};

Table.propTypes = {
  keyField: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  paginationOptions: PropTypes.object,
};

export default Table;
