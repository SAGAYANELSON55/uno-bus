import React, { useState } from "react";
import classes from "./auth.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import {
  isEmail,
  isNotEmpty,
  isPassword,
  hasMinLength,
} from "@/helpers/validation";
import { LoginProps } from "@/models/util";

const Login: React.FC<LoginProps> = ({ switch: switchHandler }) => {
  const [inputError, setInputError] = useState(false);
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const initialInput = {
    email: "",
    password: "",
  };

  const [enteredValues, setEnteredValues] = useState(initialInput);

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  let emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  let passwordIsInvalid =
    didEdit.email &&
    !isPassword(enteredValues.password) &&
    !hasMinLength(enteredValues.password, 8);

  console.log(passwordIsInvalid, emailIsInvalid);

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
    setLogin(true);
    console.log("logining in.....");
    const result = await signIn("credentials", {
      redirect: false,
      email: enteredValues.email,
      password: enteredValues.password,
    });

    if (!result!.error) {
      router.replace("/");
    } else {
      setLogin(false);
      setInputError(true);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email Id</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={enteredValues.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
            onBlur={() => handleInputBlur("email")}
            required
          />
        </div>
        {emailIsInvalid && (
          <div className={classes.error}>
            <p>*please enter a valid email</p>
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
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
        {inputError && (
          <div className={classes.error}>
            <p>*Invalid email or password</p>
          </div>
        )}
        <div className={classes.actions}>
          <button disabled={!emailIsInvalid && !passwordIsInvalid}>
            {login ? "Loging.." : "Login"}
          </button>

          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
            disabled={login}
          >
            New User
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
