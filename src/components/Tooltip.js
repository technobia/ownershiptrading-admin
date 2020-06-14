import React from "react";
import { OverlayTrigger, Tooltip as BsTooltip } from "react-bootstrap";

const Tooltip = (props) => (
  <OverlayTrigger
    placement="top"
    delay={{ show: 250, hide: 250 }}
    overlay={<BsTooltip>{props.title}</BsTooltip>}
  >
    {props.children}
  </OverlayTrigger>
);

export default Tooltip;
