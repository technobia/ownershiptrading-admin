import React from "react";
import MaskedInput from "react-text-mask";
import * as textMaskAddons from "text-mask-addons/dist/textMaskAddons";
import * as PropTypes from "prop-types";

const InputDate = ({ value, onChange, ...props }) => {
  return (
    <MaskedInput
      className="form-control"
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      pipe={textMaskAddons.createAutoCorrectedDatePipe('mm/dd/yyyy')}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
};

InputDate.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func
};

export default InputDate;
