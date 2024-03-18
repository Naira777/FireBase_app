import React, { useEffect, useState } from "react";
import s from "./Popup.module.css";
import { useDispatch } from "react-redux";
import { setIsDelete } from "../redux/User/slice";

const Popup = ({ children, mode }) => {
  const [modeInner, setModeInner] = useState(mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modeInner) {
      document.getElementById("overlay").style.visibility = "visible";
      document.getElementById("popup").style.visibility = "visible";
    }
  }, [modeInner]);

  const handleClick = () => {
    dispatch(setIsDelete(false));
  };

  return (
    <>
      {modeInner && (
        <div className={s.main}>
          <div className={s.popup} id="popup">
            <div className={s.content}>{children}</div>
          </div>
          <div id="overlay" className={s.overlay} onClick={handleClick}></div>
        </div>
      )}
    </>
  );
};
export default Popup;
