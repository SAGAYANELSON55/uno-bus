import AuthForm from "@/components/auth/auth-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        console.log(session);
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
      <AuthForm />
    </>
  );
}
