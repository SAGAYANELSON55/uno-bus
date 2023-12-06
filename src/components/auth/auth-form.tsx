// import React, { useState } from "react";
// import classes from "./auth.module.css";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/router";
// import {
//   isEmail,
//   isEquals,
//   isNotEmpty,
//   isPassword,
//   hasMinLength,
// } from "@/helpers/validation";

import { useState } from "react";
import Login from "./login-form";
import Signup from "./signup-form";

// interface userData {
//   email: string;
//   name: string;
//   password: string;
// }

// async function createUser(userData: userData) {
//   const response = await fetch("api/auth/signup", {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await response.json();
//   console.log(data.message);
//   if (!response.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }
//   return data;
// }

// function AuthForm() {
//   //state Managing  login and create account
//   const [isLogin, setIsLogin] = useState(true);
//   const [inputError, setInputError] = useState(false);
//   const [createAccount, setCreateAccount] = useState(false);
//   const [login, setLogin] = useState(false);

//   const router = useRouter();

//   //state managing user inputs
//   // const [email, setEmail] = useState("");
//   // const [password, setPassword] = useState("");
//   // const [name, setName] = useState("");
//   // const [confirmPassword, setConfirmPassword] = useState("");

//   //state managing errors
//   // const [isName, setIsName] = useState(false);
//   // const [isEmail, setIsEmail] = useState(false);
//   // const [isPassword, setIsPassword] = useState(false);
//   // const [verifyPassword, setVerifyPassword] = useState(false);

//   // function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
//   //   setUserInput((prev) => ({
//   //     ...prev,
//   //     [event.target.id]: event.target.value,
//   //   }));
//   // }

//   const initialInput = {
//     email: "",
//     name: "",
//     password: "",
//     confirmPassword: "",
//   };

//   const [enteredValues, setEnteredValues] = useState(initialInput);

//   const [didEdit, setDidEdit] = useState({
//     email: false,
//     name: false,
//     password: false,
//     confirmPassword: false,
//   });

//   const [isEmial, setIsEmail] = useState(false);

//   let emailIsInvalid =
//     didEdit.email &&
//     (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
//   // setIsEmail(emailIsInvalid);
//   let passwordIsInvalid =
//     didEdit.password &&
//     !isPassword(enteredValues.password) &&
//     !hasMinLength(enteredValues.password, 8);

//   let nameIsInvalid = didEdit.name && !isNotEmpty(enteredValues.name);

//   let confirmPasswordIsInvalid =
//     didEdit.confirmPassword &&
//     !isEquals(enteredValues.password, enteredValues.confirmPassword);

//   const formISValid =
//     !emailIsInvalid &&
//     !passwordIsInvalid &&
//     !nameIsInvalid &&
//     !confirmPasswordIsInvalid;

//   console.log(
//     didEdit.email,
//     !isEmail(enteredValues.email),
//     isNotEmpty(enteredValues.email)
//   );

//   function handleInputChange(identifier: string, value: string) {
//     setEnteredValues((prevValues) => ({
//       ...prevValues,
//       [identifier]: value,
//     }));
//     if (identifier === "password" || identifier === "confirmPassword") {
//       setDidEdit((prevEdit) => ({
//         ...prevEdit,
//         [identifier]: true,
//       }));
//     }
//     setDidEdit((prevEdit) => ({
//       ...prevEdit,
//       [identifier]: false,
//     }));
//   }

//   function handleInputBlur(identifier: string) {
//     setDidEdit((prevEdit) => ({
//       ...prevEdit,
//       [identifier]: true,
//     }));
//   }

//   function switchAuthModeHandler() {
//     setIsLogin((prevState) => !prevState);

//     setInputError(false);
//   }

//   // function NameHandler(event: React.ChangeEvent<HTMLInputElement>) {
//   //   setName(event.currentTarget.value);
//   // }

//   // function emailHandler(event: React.ChangeEvent<HTMLInputElement>) {
//   //   setEmail(event.currentTarget.value);
//   //   const isEnteredEmail = (enteredEmail: string) =>
//   //     /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredEmail);
//   //   setIsEmail(isEnteredEmail(email));
//   // }
//   // function passwordHandler(event: React.ChangeEvent<HTMLInputElement>) {
//   //   setPassword(event.currentTarget.value);
//   // }
//   // function confirmPasswordHandler(event: React.ChangeEvent<HTMLInputElement>) {
//   //   setConfirmPassword(event.currentTarget.value);
//   // }

//   async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     // console.log(emailRef);
//     // console.log(passwordRef);

//     // const enteredEmail = userInput.email;
//     // const enteredPassword = userInput.password;

//     // const isEnteredEmail = (enteredEmail: string) =>
//     //   /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(enteredEmail);

//     // const isEnteredPassword = (enteredPassword: string) =>
//     //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,32}$/.test(enteredPassword);

//     // if (!enteredEmail || !isEnteredEmail(enteredEmail)) {
//     //   setIsEmail(true);
//     // }
//     // if (
//     //   !enteredPassword ||
//     //   !isEnteredPassword(enteredPassword) ||
//     //   enteredPassword.trim().length < 7
//     // ) {
//     //   setIsPassword(true);
//     // }
//     // setIsEmail(false);
//     // setIsPassword(false);

//     // if (
//     //   !enteredEmail ||
//     //   !isEnteredEmail(enteredEmail) ||
//     //   !enteredPassword ||
//     //   !isEnteredPassword(enteredPassword) ||
//     //   enteredPassword.trim().length < 7
//     // ) {
//     //   setInputError(true);
//     // }
//     // setInputError(false);

//     if (isLogin) {
//       setLogin(true);
//       console.log("logining in.....");
//       const result = await signIn("credentials", {
//         redirect: false,
//         email: enteredValues.email,
//         password: enteredValues.password,
//       });
//       setLogin(false);
//       if (!result!.error) {
//         router.replace("/");
//       } else {
//         setInputError(true);
//       }

//       console.log(result);
//     } else {
//       console.log("creating account");

//       // const enteredFirstname = userInput.firstName;
//       // const enteredLastName = userInput.lastName;
//       // const enteredConfirmPassword = userInput.confirmPassword;

//       // if (
//       //   enteredFirstname.trim().length === 0 ||
//       //   enteredLastName.trim().length === 0
//       // ) {
//       //   setInputError(true);
//       // }
//       // setInputError(false);

//       // const name = `${enteredFirstname} ${enteredLastName}`;
//       const userData = {
//         name: enteredValues.name,
//         email: enteredValues.email,
//         password: enteredValues.password,
//       };
//       try {
//         setCreateAccount(true);
//         const result = await createUser(userData);
//         setCreateAccount(false);
//         setEnteredValues(initialInput);

//         // setIsLogin(true);
//       } catch (error) {
//         setCreateAccount(false);
//         console.log(error);
//       }
//     }
//   }

//   return (
//     <section className={classes.auth}>
//       <h1>{isLogin ? "Login" : "Sign Up"}</h1>
//       <form onSubmit={submitHandler}>
//         {!isLogin && (
//           <>
//             <div className={classes.control}>
//               <label htmlFor="Name">First Name</label>
//               <input
//                 type="text"
//                 id="Name"
//                 placeholder="Name"
//                 // value={name}
//                 // onChange={NameHandler}
//                 value={enteredValues.name}
//                 onChange={(event) =>
//                   handleInputChange("name", event.target.value)
//                 }
//                 onBlur={() => handleInputBlur("name")}
//                 required
//               />
//             </div>
//             {!isLogin && nameIsInvalid && (
//               <div className={classes.error}>
//                 <p>*invalid Name</p>
//               </div>
//             )}
//           </>
//         )}
//         <div className={classes.control}>
//           <label htmlFor="email">Email Id</label>
//           <input
//             type="email"
//             id="email"
//             placeholder="example@gmail.com"
//             // value={email}
//             // onChange={emailHandler}
//             value={enteredValues.email}
//             onChange={(event) => handleInputChange("email", event.target.value)}
//             onBlur={() => handleInputBlur("email")}
//             required
//           />
//         </div>
//         {emailIsInvalid && (
//           <div className={classes.error}>
//             <p>*invalid email</p>
//           </div>
//         )}
//         <div className={classes.control}>
//           <label htmlFor="password">
//             {!isLogin ? "New Password" : "Password"}
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Abcd123@"
//             // ref={passwordRef}
//             // value={password}
//             // onChange={passwordHandler}
//             // onBlur={}
//             value={enteredValues.password}
//             onChange={(event) =>
//               handleInputChange("password", event.target.value)
//             }
//             onBlur={() => handleInputBlur("password")}
//             required
//           />
//         </div>
//         {passwordIsInvalid && (
//           <div className={classes.error}>
//             <p>
//               *password must contain 1-uppercase 1-lowercase 1-number 1-symbol
//             </p>
//           </div>
//         )}
//         {!isLogin && (
//           <div className={classes.control}>
//             <label htmlFor="confirm-password">Confirm Password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm Password"
//               // value={confirmPassword}
//               // onChange={confirmPasswordHandler}
//               value={enteredValues.name}
//               onChange={(event) =>
//                 handleInputChange("confirmPassword", event.target.value)
//               }
//               onBlur={() => handleInputBlur("confirmPassword")}
//               required
//             ></input>
//           </div>
//         )}
//         {!isLogin && confirmPasswordIsInvalid && (
//           <div className={classes.error}>
//             <p>*password mismatch</p>
//           </div>
//         )}
//         {inputError && isLogin && (
//           <div className={classes.error}>
//             <p>*Invalid email or password</p>
//           </div>
//         )}
//         <div className={classes.actions}>
//           {/* {isLogin ? login &&  : createAccount && <Loader />} */}

//           {
//             <button
//               disabled={
//                 isLogin ? !emailIsInvalid && !passwordIsInvalid : formISValid
//               }
//             >
//               {isLogin
//                 ? login
//                   ? "Loging.."
//                   : "Login"
//                 : createAccount
//                 ? "Creating..."
//                 : "Create Account"}
//             </button>
//           }
//           <button
//             type="button"
//             className={classes.toggle}
//             onClick={switchAuthModeHandler}
//             disabled={login || createAccount}
//           >
//             {isLogin ? "New User" : "Already a User"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

// export default AuthForm;

export default function AuthForm() {
  const [isLogin, setIslogin] = useState(true);

  function switchHandler() {
    setIslogin((prevState) => !prevState);
  }
  return (
    <>
      {isLogin ? (
        <Login switch={switchHandler} />
      ) : (
        <Signup switch={switchHandler} />
      )}
    </>
  );
}