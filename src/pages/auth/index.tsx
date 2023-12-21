import AuthForm from "@/components/auth/auth-form";
import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Loader from "@/components/layout/loader";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  //redirect logic after successfull login

  useLayoutEffect(() => {
    getSession().then((session) => {
      console.log(session);
      if (session?.user.name === "Admin") {
        router.replace("/admin");
      }
      if (session?.user.name === "User") {
        console.log(session);
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <AuthForm />
    </>
  );
}
