import React, { useEffect, useState } from "react";
import RcSelect from "react-select";
import isEmpty from "lodash/isEmpty";
import isArray from "lodash/isArray";
import find from "lodash/find";
import cs from "classnames";
import "src/vendor/libs/react-select/react-select.scss"
import * as PropTypes from "prop-types";

const MultiSelect = ({ value, options, disabled, onChange, isInvalid, loading, ...props }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isEmpty(options) && isArray(value)) {
      if (typeof value[0] === "string") {
        const _data = [];
        value.forEach(item => {
          if (find(options, { value: item })) {
            _data.push(find(options, { value: item }));
          } else {
            _data.push({ value: item, label: item })
          }
        });
        setData(_data);
      } else {
        setData(value);
      }
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
      isMulti
      className={cs({
        "react-select": true,
        "w-100": true,
        "is-invalid": isInvalid,
      })}
      value={data}
      onChange={handleOnChange}
      classNamePrefix="react-select"
      options={options}
      isDisabled={disabled}
      isLoading={loading}
      {...props}
    />
  )
};

MultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
};

export default MultiSelect;
