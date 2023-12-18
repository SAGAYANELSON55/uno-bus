import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Unotherized = () => {
  const router = useRouter();
  function homeLoader() {
    router.replace("/admin");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "250px" }}>
      <h2> please login as a user to continue</h2>
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
