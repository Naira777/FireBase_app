import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ref, update } from "firebase/database";
import s from "./UserSettings.module.css";
import Button from "@mui/material/Button";
import AppInput from "../app/app-input";

const UserSettings = ({
  userName,
  userPhoto,
  userSurname,
  userProf,
  activeUserId,
  userEmail,
  url,
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [photo, setPhoto] = useState("");
  const [prof, setProf] = useState("");

  useEffect(() => {
    setPhoto(userPhoto);
    setName(userName);
    setSurname(userSurname);
    setProf(userProf);
  }, [activeUserId]);

  const saveInfo = (id) => {
    update(ref(db, `/users/` + id), {
      name: name,
      surname: surname,
      imageUrl: photo,
      prof: prof,
    });
    navigate(url);
  };

  return (
    <div className={s.boxAll}>
      {activeUserId && (
        <div className={s.box}>
          <div className={s.boxImg}>
            <img className={s.img} src={userPhoto} alt="User image" />
            <AppInput
              defaultValue={userPhoto}
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
              {userEmail ? <h5>Email</h5> : ""}{" "}
              <p className={s.text}> {userEmail} </p>
            </div>
            <div className={s.line1}>
              {userName ? <h5>Name</h5> : ""}
              <div className={s.box1}>
                <AppInput
                  defaultValue={userName}
                  type={"text"}
                  placeholder={"Enter your name"}
                  label={"Name"}
                  value={name}
                  handleChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className={s.line1}>
              {userSurname ? <h5>SurName</h5> : ""}

              <div className={s.box1}>
                <AppInput
                  defaultValue={userSurname}
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
              {userProf ? <h5>Profession</h5> : ""}

              <div className={s.box1}>
                <AppInput
                  defaultValue={userProf}
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
              onClick={() => saveInfo(activeUserId)}
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
export default UserSettings;
