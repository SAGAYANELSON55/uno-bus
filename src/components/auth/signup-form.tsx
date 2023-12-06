import React, { useState } from "react";
import classes from "./auth.module.css";
import { Snackbar, Alert } from "@mui/material";
import {
  isEmail,
  isEquals,
  isNotEmpty,
  hasMinLength,
  hasLowercase,
  hasNumber,
  hasSpecialCharacter,
  hasUppercase,
} from "@/helpers/validation";
import { SignupProps } from "@/models/util";
import { userData } from "@/models/util";

async function createUser(userData: userData) {
  try {
    const response = await fetch("api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

const Signup: React.FC<SignupProps> = ({ switch: switchHandler }) => {
  const [createAccount, setCreateAccount] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [message, setmessage] = useState("user Created!!");
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

  const passwordminLength =
    didEdit.password && hasMinLength(enteredValues.password, 8);

  const passwordhasUppercase =
    didEdit.password && hasUppercase(enteredValues.password);

  const passwordhasLowercase =
    didEdit.password && hasLowercase(enteredValues.password);

  const passwordhasSpecialcharacter =
    didEdit.password && hasSpecialCharacter(enteredValues.password);

  const passwordhasnumber =
    didEdit.password && hasNumber(enteredValues.password);
  // const passwordIsInvalid =
  //   didEdit.email &&
  //   (!isPassword(enteredValues.password) ||
  //     !hasMinLength(enteredValues.password, 8));

  const passwordIsInvalid =
    didEdit.password &&
    (!passwordminLength ||
      !passwordhasLowercase ||
      !passwordhasSpecialcharacter ||
      !passwordhasUppercase);
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
      setOpen(true);
      setTimeout(() => switchHandler(), 3200);
    } catch (error) {
      setError(true);
      setCreateAccount(false);
      setmessage(error.message);
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
          <Alert
            onClose={close}
            severity={error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {message}
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
          {didEdit.password && !passwordminLength && (
            <div className={classes.error}>
              <p>*min-length=8</p>
            </div>
          )}
          {didEdit.password && !passwordhasLowercase && (
            <div className={classes.error}>
              <p>*Aleast one lowercase</p>
            </div>
          )}
          {didEdit.password && !passwordhasUppercase && (
            <div className={classes.error}>
              <p>*Aleast one uppercase</p>
            </div>
          )}
          {didEdit.password && !passwordhasSpecialcharacter && (
            <div className={classes.error}>
              <p>*Aleast one special character</p>
            </div>
          )}
          {didEdit.password && !passwordhasnumber && (
            <div className={classes.error}>
              <p>*Aleast one number</p>
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

          <div className={classes.actions}>
            <button
              disabled={
                nameIsInvalid ||
                emailIsInvalid ||
                passwordIsInvalid ||
                confirmPasswordIsInvalid
              }
            >
              {createAccount ? "Creating..." : "Create Account"}
            </button>
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
