import React from "react";
import MaskedInput from "react-text-mask";
import * as textMaskAddons from "text-mask-addons/dist/textMaskAddons";
import * as PropTypes from "prop-types";

const InputNumber = ({ value, onChange, ...props }) => {
  const handleOnChange = e => {
    const num = e.target.value.replace(/,/g, "");
    onChange(num ? parseInt(num, 10) : "");
  };

  return (
    <MaskedInput
      className="form-control"
      mask={textMaskAddons.createNumberMask({ prefix: ""})}
      value={value}
      onChange={handleOnChange}
      {...props}
    />
  )
};

InputNumber.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default InputNumber;
