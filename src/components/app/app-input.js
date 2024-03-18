import TextField from "@mui/material/TextField";
import React from "react";
import s from "./app-input.module.css";

const AppInput = ({
  REF,
  type,
  placeholder,
  label,
  value,
  handleChange,
  defaultValue,
  onKeyPressHandle,
}) => {
  return (
    <TextField
      ref={REF}
      type={type}
      margin="dense"
      placeholder={placeholder}
      defaultValue={defaultValue}
      label={label}
      variant="outlined"
      value={value}
      size="small"
      inputProps={{ style: { fontSize: 15 } }}
      sx={{ "& input::placeholder": { fontSize: "13px" } }}
      className={s.input}
      onChange={handleChange}
      onKeyPress={onKeyPressHandle}
    />
  );
};
export default AppInput;
