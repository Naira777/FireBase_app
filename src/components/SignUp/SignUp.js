import React, { useEffect, useRef, useState } from "react";
import s from "./SignUp.module.css";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import mark from "../../assets/checkmark.svg";
import Button from "@mui/material/Button";
import AppInput from "../app/app-input";
import useIsUser from "./../customHook";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [surname, setSurname] = useState("");
  const [prof, setProf] = useState("");
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();
  let minUppSym = /^(?=(.*?[A-Z]){3}).{3,}$/;
  let minLowerSym = /^(?=(.*?[a-z]){3}).{3,}$/;
  let digits3 = /^(?=(.*?[1-9]){3}).{3,}$/;

  const ref1 = useRef(null);
  const refPhoto = useRef(null);
  const refProf = useRef(null);
  const ref4 = useRef(null);
  const refName = useRef(null);
  const refSurname = useRef(null);
  const refEmail = useRef(null);
  const refPass = useRef(null);
  const refBox = useRef(null);

  const user = useIsUser();

  useEffect(() => {
    if (email?.length != 0) {
      refEmail.current.style.border = "none";
    }
    if (surname?.length != 0) {
      refSurname.current.style.border = "none";
    }

    if (name?.length != 0) {
      refName.current.style.border = "none";
    }
    if (password?.length != 0) {
      refPass.current.style.border = "none";
    }
    if (email?.length != 0) {
      refEmail.current.style.border = "none";
    }
    if (photo?.length != 0) {
      refPhoto.current.style.border = "none";
    }
    if (prof?.length != 0) {
      refProf.current.style.border = "none";
    }
  }, [
    email?.length,
    surname?.length,
    name?.length,
    password?.length,
    prof?.length,
    photo?.length,
  ]);

  useEffect(() => {
    if (password.length > 0) {
      refBox.current.style.display = "flex";
    } else {
      refBox.current.style.display = "none";
    }
    if (password.length === 0) {
      ref1.current.style.background = "#c8ccd0";
    }
    if (
      digits3.test(password) ||
      minLowerSym.test(password) ||
      minUppSym.test(password)
    ) {
      ref1.current.style.background = `linear-gradient(to right,
        #377DFF 10%, #0052E01A 60% 100%)`;
    } else {
      ref1.current.style.background = "#c8ccd0";
    }
    if (
      (digits3.test(password) || minLowerSym.test(password)) &&
      (minLowerSym.test(password) || minUppSym.test(password)) &&
      (minUppSym.test(password) || digits3.test(password))
    ) {
      ref1.current.style.background = `linear-gradient(to right,
        #377DFF 60%, #0052E01A 80% 80%)`;
    }

    if (
      digits3.test(password) &&
      minLowerSym.test(password) &&
      minUppSym.test(password)
    ) {
      ref1.current.style.background = `linear-gradient(to right,
        #377DFF 100%, #0052E01A 100% 100%)`;
      setMode(true);
    } else {
      setMode(false);
    }
  }, [password.length]);

  const signUp = async (e) => {
    e.preventDefault();

    if (email.length == 0) {
      refEmail.current.style.border = "1px solid red";
      refEmail.current.style.borderRadius = "5px";
    }
    if (surname.length == 0) {
      refSurname.current.style.border = "1px solid red";
      refSurname.current.style.borderRadius = "5px";
    }
    if (name.length == 0) {
      refName.current.style.border = "1px solid red";
      refName.current.style.borderRadius = "5px";
    }
    if (password.length == 0) {
      refPass.current.style.border = "1px solid red";
      refPass.current.style.borderRadius = "5px";
    }
    if (photo.length == 0) {
      refPhoto.current.style.border = "1px solid red";
      refPhoto.current.style.borderRadius = "5px";
    }
    if (prof.length == 0) {
      refProf.current.style.border = "1px solid red";
      refProf.current.style.borderRadius = "5px";
    }

    if (
      name.length != 0 &&
      surname.length != 0 &&
      email.length != 0 &&
      photo.length != 0 &&
      prof.length != 0 &&
      password.length >= 9
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {})
        .catch((error) => {});
    }
  };

  useEffect(() => {
    if (
      user?.uid &&
      name != "" &&
      surname != "" &&
      email != "" &&
      photo != ""
    ) {
      set(ref(db, "users/" + user.uid), {
        name: name,
        surname: surname,
        email: email,
        imageUrl: photo,
        prof: prof,
      })
        .then(() => {
          console.log("Success");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  return (
    <div className={s.container}>
      {user && <h2>You are logged</h2>}
      {!user && (
        <>
          <p className={s.header}> Create Account </p>

          <AppInput
            REF={refEmail}
            type={"email"}
            placeholder={"Enter your email"}
            label={"Email"}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <div className={s.boxFlex}>
            <AppInput
              REF={refPass}
              type={"password"}
              placeholder={"Enter your password"}
              label={"Password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <div className={s.imgBox}>
              {mode && (
                <img ref={ref4} className={s.img} src={mark} alt="image" />
              )}
            </div>
          </div>
          <div ref={refBox} className={s.box}>
            <div className={s.line1} ref={ref1}></div>
          </div>
          <div>
            <AppInput
              REF={refName}
              type={"text"}
              placeholder={"Enter your name"}
              label={"Name"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <AppInput
              REF={refSurname}
              type={"text"}
              placeholder={"Enter your surname"}
              label={"Surname"}
              value={surname}
              handleChange={(e) => setSurname(e.target.value)}
            />
          </div>

          <div>
            <AppInput
              REF={refPhoto}
              type={"text"}
              placeholder={"Enter your photo url"}
              label={"Photo"}
              value={photo}
              handleChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div>
            <AppInput
              REF={refProf}
              type={"text"}
              placeholder={"Enter your profession"}
              label={"Profession"}
              value={prof}
              handleChange={(e) => setProf(e.target.value)}
            />
          </div>
          <Button margin="dense" variant="contained" onClick={signUp}>
            {" "}
            Register{" "}
          </Button>
        </>
      )}
    </div>
  );
};
export default SignUp;
