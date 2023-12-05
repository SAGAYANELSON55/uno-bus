import React, { useState } from "react";
import classes from "./auth.module.css";
import { Snackbar, Alert } from "@mui/material";
import {
  isEmail,
  isEquals,
  isNotEmpty,
  isPassword,
  hasMinLength,
} from "@/helpers/validation";
import { SignupProps } from "@/models/util";
import { userData } from "../../models/util";

async function createUser(userData: userData) {
  const response = await fetch("api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok || response.status === 401) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  const data = await response.json();
  console.log(data.message);
  return data;
}

const Signup: React.FC<SignupProps> = ({ switch: switchHandler }) => {
  const [createAccount, setCreateAccount] = useState(false);
  const [emailerror, setEmailError] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("successful");
  const initialInput = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const [enteredValues, setEnteredValues] = useState(initialInput);

  const [didEdit, setDidEdit] = useState({
    email: false,
    name: false,
    password: false,
    confirmPassword: false,
  });
  let emailIsInvalid =
    didEdit.email &&
    (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));

  let passwordIsInvalid =
    didEdit.password &&
    !isPassword(enteredValues.password) &&
    !hasMinLength(enteredValues.password, 8);

  let nameIsInvalid = didEdit.name && !isNotEmpty(enteredValues.name);

  let confirmPasswordIsInvalid =
    didEdit.confirmPassword &&
    !isEquals(enteredValues.password, enteredValues.confirmPassword);
  function handleInputChange(identifier: string, value: string) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    if (identifier === "password" || identifier === "confirmPassword") {
      setDidEdit((prevEdit) => ({
        ...prevEdit,
        [identifier]: true,
      }));
    }
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier: string) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  function switchAuthModeHandler() {
    switchHandler();
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userData = {
      name: enteredValues.name,
      email: enteredValues.email,
      password: enteredValues.password,
    };
    try {
      setCreateAccount(true);
      const result = await createUser(userData);
      setCreateAccount(false);
      setEnteredValues(initialInput);
      setOpen(true);
      switchHandler();
    } catch (error) {
      setEmailError(error.message);
      setCreateAccount(false);
      setOpen(true);
    }
  }

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={close}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={close} severity="success" sx={{ width: "100%" }}>
            Payment successfull
          </Alert>
        </Snackbar>
      )}

      <section className={classes.auth}>
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              id="Name"
              placeholder="Name"
              autoComplete="Name"
              value={enteredValues.name}
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
              onBlur={() => handleInputBlur("name")}
              required
            />
          </div>
          {nameIsInvalid && (
            <div className={classes.error}>
              <p>*Please enter a valid Name</p>
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="email">Email Id</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="example@gmail.com"
              value={enteredValues.email}
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
              onBlur={() => handleInputBlur("email")}
              required
            />
          </div>
          {emailIsInvalid && (
            <div className={classes.error}>
              <p>*Please enter a valid email</p>
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Abcd123@"
              value={enteredValues.password}
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
              onBlur={() => handleInputBlur("password")}
              required
            />
          </div>
          {passwordIsInvalid && (
            <div className={classes.error}>
              <p>
                *password must contain 1-uppercase 1-lowercase 1-number 1-symbol
              </p>
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={enteredValues.confirmPassword}
              onChange={(event) =>
                handleInputChange("confirmPassword", event.target.value)
              }
              onBlur={() => handleInputBlur("confirmPassword")}
              required
            ></input>
          </div>

          {confirmPasswordIsInvalid && (
            <div className={classes.error}>
              <p>*password mismatch</p>
            </div>
          )}
          {emailerror && (
            <div className={classes.error}>
              <p>{emailerror}</p>
            </div>
          )}

          <div className={classes.actions}>
            <button>{createAccount ? "Creating..." : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
              disabled={createAccount}
            >
              Already a User
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
