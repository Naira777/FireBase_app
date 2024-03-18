import s from "./components/AuthDetails/AuthDetails.module.css";
import Button from "@mui/material/Button";
import SideBar from "./components/SlideBar/SideBar";
import React, { useEffect, useState } from "react";
import useIsUser from "./components/customHook";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { setAllUsers, setUserId, setUserInfo } from "./redux/User/slice";
import { useDispatch } from "react-redux";

const MainLayout = ({ children }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useIsUser();

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

        setPhoto(activeUser?.imageUrl);
        setName(activeUser?.name);
        setSurname(activeUser?.surname);
        dispatch(setUserInfo(activeUser));
        dispatch(setAllUsers(allUsers1));
      }
    });
  }, [user]);

  return (
    <div className={s.boxAll}>
      {!user && (
        <div className={s.button}>
          <Button
            margin="dense"
            size="small"
            variant="contained"
            onClick={() => navigate("/")}
          >
            {" "}
            Log In{" "}
          </Button>
        </div>
      )}
      {user && (
        <>
          {" "}
          <SideBar photo={photo} name={name} surname={surname} />
          {children}
        </>
      )}
    </div>
  );
};
export default MainLayout;
