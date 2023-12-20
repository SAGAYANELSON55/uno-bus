import AuthForm from "@/components/auth/auth-form";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import Loader from "@/components/layout/loader";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data, status } = useSession();
  //redirect logic after successfull login

  useLayoutEffect(() => {
    // getSession().then((session) => {
    //   console.log(session);
    //   if (session?.user.name === "Admin") {
    //     router.replace("/admin");
    //   }
    //   if (session?.user.name === "User") {
    //     console.log(session);
    //     router.replace("/");
    //   } else {
    //     setIsLoading(false);
    //   }
    // });
    if (data) {
      if (data?.user?.name === "Admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } else {
      setIsLoading(false);
    }
  }, [setIsLoading, data, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AuthForm />
    </>
  );
}
