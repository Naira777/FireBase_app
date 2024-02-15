import React, { useEffect, useRef, useState } from "react";
import s from "./SignIn.module.css";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import useIsUser from "../customHook";
import AppInput from "../app/app-input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const refEmail = useRef(null);
  const refPass = useRef(null);
  const navigate = useNavigate();
  const user = useIsUser();

  const signIn = (e) => {
    e.preventDefault();

    if (email.length == 0) {
      refEmail.current.style.border = "1px solid red";
      refEmail.current.style.borderRadius = "5px";
    }

    if (password.length == 0) {
      refPass.current.style.border = "1px solid red";
      refPass.current.style.borderRadius = "5px";
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      signIn(event);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <div className={s.container}>
      {!user && (
        <>
          <form>
            <h1> SignIn </h1>

            <AppInput
              REF={refEmail}
              type={"email"}
              placeholder={"Enter your email"}
              label={"Email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              onKeyPressHandle={handleKeyPress}
            />

            <div>
              <AppInput
                REF={refPass}
                type={"password"}
                placeholder={"Enter your password"}
                label={"Password"}
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                onKeyPressHandle={handleKeyPress}
              />
            </div>
          </form>
          <Button
            margin="normal"
            variant="contained"
            onClick={signIn}
            onKeyDown={(e) => (e.key === "Enter" ? signIn : "")}
          >
            {" "}
            Log In{" "}
          </Button>

          <div className={s.button1}></div>
          <Button
            margin="margin-normal"
            variant="contained"
            onClick={() => navigate("/createAccount")}
          >
            Create account{" "}
          </Button>
        </>
      )}
    </div>
  );
};
export default SignIn;
