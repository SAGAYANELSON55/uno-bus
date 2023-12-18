import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";

const Unotherized = () => {
  const router = useRouter();
  const { data, status } = useSession();

  function homeLoader() {
    if (data?.user.name === "Admin") {
      router.replace("/admin");
    } else {
      router.replace("/");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2>un-otherized action | please login to continue</h2>
      <p style={{ paddingTop: "5px" }}>
        click here to navigate to the Home page
      </p>
      <Button onClick={homeLoader} color="success">
        Home
      </Button>
    </div>
  );
};

export default Unotherized;
