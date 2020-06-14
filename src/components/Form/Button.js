import React from "react";
import { Button as BsButton, Spinner } from "react-bootstrap";
import * as PropTypes from "prop-types";

const Button = ({ children, loading, ...props }) => {
  return (
    <BsButton {...props}>
      {loading && (<Spinner animation="border" className="mr-2" />)}
      {children}
    </BsButton>
  )
};

Button.propTypes = {
  loading: PropTypes.bool,
};

export default Button;
