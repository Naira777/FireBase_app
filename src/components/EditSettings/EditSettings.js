import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import s from "./EditSettings.module.css";
import Button from "@mui/material/Button";
import AppInput from "../app/app-input";
import { useSelector } from "react-redux";
import useIsUser from "../customHook";

const EditSettings = () => {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState(undefined);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [photo, setPhoto] = useState("");
  const [prof, setProf] = useState("");
  const { userInfo } = useSelector((state) => state.user);

  const user = useIsUser();

  useEffect(() => {
    setActiveUser(userInfo);
    setPhoto(userInfo.imageUrl);
    setName(userInfo.name);
    setSurname(userInfo.surname);
    setProf(userInfo.prof);
  }, [userInfo]);

  const saveInfo = (id) => {
    update(ref(db, `/users/` + id), {
      name: name,
      surname: surname,
      imageUrl: photo,
      prof: prof,
    });
    navigate("/dashboard");
  };

  return (
    <div className={s.boxAll}>
      {activeUser && (
        <div className={s.box}>
          <div className={s.boxImg}>
            <img className={s.img} src={activeUser.imageUrl} alt="image" />
            <AppInput
              defaultValue={activeUser.imageUrl}
              type={"text"}
              placeholder={"Enter your photo url"}
              label={"Photo"}
              value={photo}
              handleChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div className={s.line}></div>
          <div className={s.boxInfo}>
            <div className={s.line1Email}>
              {activeUser.email ? <h5>Email</h5> : ""}{" "}
              <p className={s.text}> {activeUser.email} </p>
            </div>
            <div className={s.line1}>
              {activeUser.name ? <h5>Name</h5> : ""}
              <div className={s.box1}>
                <AppInput
                  defaultValue={activeUser.name}
                  type={"text"}
                  placeholder={"Enter your name"}
                  label={"Name"}
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className={s.line1}>
              {activeUser.surname ? <h5>SurName</h5> : ""}

              <div className={s.box1}>
                <AppInput
                  defaultValue={activeUser.surname}
                  type={"text"}
                  placeholder={"Enter your surname"}
                  label={"Surname"}
                  value={surname}
                  handleChange={(e) => setSurname(e.target.value)}
                />
              </div>
            </div>

            <div className={s.line2}></div>
            <div className={s.line1}>
              {activeUser.prof ? <h5>Profession</h5> : ""}

              <div className={s.box1}>
                <AppInput
                  defaultValue={activeUser.prof}
                  type={"text"}
                  placeholder={"Enter your profession"}
                  label={"Profession"}
                  value={prof}
                  handleChange={(e) => setProf(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={s.boxButton}></div>
          <div className={s.saveButton}>
            <Button
              margin="dense"
              size="small"
              variant="contained"
              onClick={() => saveInfo(user?.uid)}
            >
              {" "}
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditSettings;
