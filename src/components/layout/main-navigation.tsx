import Link from "next/link";
import style from "./main-navigation.module.css";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function MainHeader() {
  const { data, status } = useSession();
  const route = useRouter();
  async function logoutHandler() {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    route.push(data.url);
  }
  return (
    <header className={style.header}>
      <Link href="/">
        <div className={style.logo}>Uno Bus</div>
      </Link>
      <nav>
        <ul>
          {!data && status !== "loading" && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {/* {data && (
            <li>
              <Link href="/profile"></Link>
            </li>
          )} */}
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
