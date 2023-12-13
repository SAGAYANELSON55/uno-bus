import Link from "next/link";
import style from "./main-navigation.module.css";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { setSeatLog } from "@/store/data/seat-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useState } from "react";

function MainHeader() {
  const dispatch: AppDispatch = useDispatch();
  const { data, status } = useSession();

  const router = useRouter();

  function loginHandler() {
    dispatch(setSeatLog.addpath({ path: router.asPath }));
    router.push("/auth");
  }

  async function logoutHandler() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  }

  return (
    <header className={style.header}>
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
