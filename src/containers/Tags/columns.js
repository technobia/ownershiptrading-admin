import React from "react";
import styles from "./TagList.module.scss"
import { Button } from "react-bootstrap";
import Tooltip from "src/components/Tooltip";

export default function columns(props) {
  return [
    {
      text: "Tag ID",
      dataField: "tag_id",
    },
    {
      text: "Advertiser",
      dataField: "adv_id"
    },
    {
      text: "Account manager",
      dataField: "AM"
    },
    {
      text: "Media",
      dataField: "traffic_type"
    },
    {
      text: "Multipule",
      dataField: "isMultipule"
    },
    {
      text: "Actions",
      dataField: "",
      headerClasses: "text-center",
      headerStyle: { paddingLeft: 0, paddingRight: 0 },
      classes: "text-center align-middle",
      style: { padding: 0, width: 150 },
      formatter: (cell, row) => (
        <div className={styles.actions}>
          <Tooltip title="Edit">
            <Button variant="default icon-btn" size="sm" onClick={() => props.onClickEdit(row.tag_id)}>
              <span className="ion ion-md-create"/>
            </Button>
          </Tooltip>

          <Tooltip title="Duplicate">
            <Button variant="default icon-btn" size="sm" onClick={() => console.log("duplicate")}>
              <span className="ion ion-ios-copy"/>
            </Button>
          </Tooltip>

          <span className="text-lighter ml-2 mr-2">|</span>

          <Tooltip title="Remove">
            <Button variant="default icon-btn" size="sm" onClick={() => console.log("remove")}>
              <span className="ion ion-md-trash text-danger"/>
            </Button>
          </Tooltip>
        </div>
      )
    }
  ];
}
