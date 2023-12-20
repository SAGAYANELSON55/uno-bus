import React, { useEffect, useState } from "react";
import classes from "./auth.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  isEmail,
  isNotEmpty,
  hasMinLength,
  hasLowercase,
  hasNumber,
  hasSpecialCharacter,
  hasUppercase,
} from "@/helpers/validation";
import { LoginProps } from "@/models/util";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Login: React.FC<LoginProps> = ({ switch: switchHandler }) => {
  const path = useSelector((state: RootState) => state.seatLog.pathname);
  const [inputError, setInputError] = useState(false);
  const [login, setLogin] = useState(false);
  const { data: session, status } = useSession();
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

  const emailIsInvalid =
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

  const passwordIsInvalid =
    didEdit.password &&
    (!passwordminLength ||
      !passwordhasLowercase ||
      !passwordhasSpecialcharacter ||
      !passwordhasUppercase);

  function handleInputChange(identifier: string, value: string) {
    setInputError(false);
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier: string) {
    setInputError(false);
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

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredValues.email,
      password: enteredValues.password,
    });

    if (!result!.error) {
      console.log(result);
    } else {
      console.log("invalid email or password");
      setLogin(false);
      setInputError(true);
    }
  }

  if (session?.user.name === "User") {
    router.replace(path);
  }
  if (session?.user.name === "Admin") {
    router.replace("/admin");
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
            autoComplete="email"
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
        {inputError && (
          <div className={classes.error}>
            <p>*Invalid email or password</p>
          </div>
        )}
        <div className={classes.actions}>
          <button disabled={emailIsInvalid || passwordIsInvalid}>
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
