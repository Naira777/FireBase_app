import React from "react";
import s from "./FormSelect.module.css";

const FormSelect = ({
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className={s.formRow}>
      {label && <label>{label}</label>}

      <select
        className="formselect"
        value={defaultValue}
        onChange={handleChange}
        {...otherProps}
      >
        {options.map((option, index) => {
          const { value, name } = option;

          return (
            <option key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
