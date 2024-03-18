import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";
import s from "./AuthDetails.module.css";
import useIsUser from "../customHook";
import { setAllUsers, setUserId, setUserInfo } from "../../redux/User/slice";
import { useDispatch } from "react-redux";

const AuthDetails = () => {
  const [activeUser, setActiveUser] = useState(undefined);
  const user = useIsUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUserId(user?.uid));
    const dataRef = ref(db, "/users");
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      const allUsers1 = Object.values(data);

      if (data != null) {
        const keys = Object.keys(data);
        for (let i = 0; i < allUsers1.length; i++) {
          allUsers1[i].id = keys[i];
        }
        const activeUser = Object.values(data).find(
          ({ email }) => email === user?.email,
        );
        setActiveUser(activeUser);
        dispatch(setUserInfo(activeUser));
        dispatch(setAllUsers(allUsers1));
        dispatch(setUserId(user?.uid));
      }
    });
  }, [user]);

  return (
    <div className={s.boxAll}>
      {activeUser && (
        <div className={s.box}>
          <div className={s.boxImg}>
            <img className={s.img} src={activeUser.imageUrl} alt="image" />
            <p className={s.text1}>
              {activeUser.name} {activeUser.surname}
            </p>
          </div>

          <div className={s.line}></div>

          <div className={s.boxInfo}>
            <div className={s.line1}>
              <span>{activeUser.name ? <h5>Name</h5> : ""}</span>
              <p className={s.text}>{activeUser.name}</p>
            </div>

            <div className={s.line1}>
              <h5>Surname </h5>{" "}
              <p className={s.text}>{activeUser.surname || "-"}</p>
            </div>

            <div className={s.line1}>
              {activeUser.email ? <h5>Email</h5> : ""}{" "}
              <p className={s.text}>{activeUser.email}</p>
            </div>

            <div className={s.line2}></div>
            <div className={s.line1}>
              {activeUser.prof ? <h5>Profession</h5> : ""}
              <p className={s.text}>{activeUser.prof}</p>
            </div>
          </div>
          <div className={s.boxButton}></div>
        </div>
      )}
    </div>
  );
};
export default AuthDetails;
