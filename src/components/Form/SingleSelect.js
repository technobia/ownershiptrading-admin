import React, { useEffect, useState } from "react";
import RcSelect from "react-select";
import find from "lodash/find";
import cs from "classnames";
import "src/vendor/libs/react-select/react-select.scss"
import * as PropTypes from "prop-types";

const SingleSelect = ({ value, options, disabled, onChange, isInvalid, loading, ...props }) => {
  const [data, setData] = useState(value);

  useEffect(() => {
    if (typeof value === "string") {
      setData(find(options, { value }));
    } else {
      setData(value);
    }
    // eslint-disable-next-line
  }, [value]);

  const handleOnChange = (selectItem) => {
    if (onChange) {
      onChange(selectItem);
    }
  };

  return (
    <RcSelect
      className={cs({
        "react-select": true,
        "w-100": true,
        "is-invalid": isInvalid,
      })}
      classNamePrefix="react-select"
      options={options}
      value={data}
      onChange={handleOnChange}
      isClearable={true}
      isSearchable={true}
      isDisabled={disabled}
      isLoading={loading}
      {...props}
    />
  )
};

SingleSelect.defaultProps = {
  options: [],
  value: ""
};

SingleSelect.propTypes = {
  options: PropTypes.array.isRequired,
};

export default SingleSelect;
