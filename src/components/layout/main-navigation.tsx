import Link from "next/link";
import style from "./main-navigation.module.css";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { setSeatLog } from "@/store/data/seat-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

function MainHeader() {
  const dispatch: AppDispatch = useDispatch();
  const { data, status } = useSession();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  function loginHandler() {
    dispatch(setSeatLog.addpath({ path: router.asPath }));
    router.push("/auth");
  }

  async function logoutHandler() {
    setOpen(true);
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  }

  const close = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  3;

  return (
    <header className={style.header}>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={close}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={close} severity="success" sx={{ width: "100%" }}>
            Logged out !!!
          </Alert>
        </Snackbar>
      )}
      {data?.user.name === "Admin" ? (
        <Link href="/admin">
          <div className={style.logo}>Uno Bus</div>
        </Link>
      ) : (
        <Link href="/">
          <div className={style.logo}>Uno Bus</div>
        </Link>
      )}
      <nav>
        <ul>
          {!data && status !== "loading" && (
            <li>
              <button onClick={loginHandler}>Login</button>
            </li>
          )}
          {data?.user.name === "Admin" && (
            <div className={style.navLink}>
              <li className={`${style.link}`}>
                <Link href="/admin/addbus">Add Bus</Link>
              </li>
              <li className={`${style.link} `}>
                <Link href="/admin/buslist">Bus List</Link>
              </li>
            </div>
          )}

          {data?.user.name && (
            <div className={style.profile}>
              <a className={style.userlogo}>{data.user.name[0]}</a>
              <div className={style.profileName}>{data.user.name}</div>
            </div>
          )}
          {data && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
