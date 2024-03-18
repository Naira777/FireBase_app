import Button from "@mui/material/Button";
import React from "react";
import s from "./DeleteItem.module.css";

const DeleteItem = ({ handleClick1, handleClick2 }) => {
  return (
    <div className={s.box}>
      <p className={s.text}> Are you sure? </p>
      <div className={s.buttonBox}>
        <Button
          margin="dense"
          size="small"
          onClick={handleClick1}
          variant="contained"
          className={s.button}
        >
          {" "}
          No
        </Button>
        <Button
          margin="dense"
          size="small"
          onClick={handleClick2}
          variant="contained"
          className={s.button}
        >
          {" "}
          Delete
        </Button>
      </div>
    </div>
  );
};
export default DeleteItem;
