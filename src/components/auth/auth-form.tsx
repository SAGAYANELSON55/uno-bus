import { useState } from "react";
import Login from "./login-form";
import Signup from "./signup-form";

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
