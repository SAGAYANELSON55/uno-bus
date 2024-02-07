// import AuthForm from "@/components/auth/auth-form";
// import { useState, useLayoutEffect, useEffect } from "react";
// import { useRouter } from "next/router";
// import { getSession } from "next-auth/react";
// import Loader from "@/components/layout/loader";

// export default function Auth() {
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   //redirect logic after successfull login

//   useEffect(() => {
//     getSession().then((session) => {
//       if (session && session?.user.name === "Admin") {
//         console.log("hello");
//         router.replace("/admin");
//       }
//       if (session && session?.user.name !== "Admin") {
//         console.log(session);
//         router.replace("/");
//       } else {
//         console.log("cancelled");
//         setIsLoading(false);
//       }
//     });
//   });

//   if (isLoading) {
//     return <Loader />;
//   }
//   console.log("Loading");
//   return <AuthForm />;
// }

import AuthForm from "@/components/auth/auth-form";
import { useRouter } from "next/router";
import Loader from "@/components/layout/loader";
import { getSession } from "next-auth/react";

export default function Auth({ isLoading }) {
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  return <AuthForm />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session && session.user.name === "Admin") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  if (session && session.user.name !== "Admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLoading: false,
    },
  };
}
