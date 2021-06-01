import React from "react";

import "../styles.css";

const Checkbox = ({
  defaultClass,
  activeClass,
  label,
  isSelected,
  onCheckboxChange,
}) => {
  return (
    <div style={isSelected ? activeClass : defaultClass}>
      <input
        name={label}
        type="checkbox"
        checked={isSelected}
        onChange={onCheckboxChange}
        key={label}
      />
    </div>
  );
};

export default Checkbox;
