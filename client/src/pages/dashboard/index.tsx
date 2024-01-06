import NavBar from "@/components/Appbar";
import { token, user } from "@/libs/getToken";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

interface dashboardProps {
  userInfoProps: {
    firstName: string;
    lastName: string;
    email: string;
  };
}

const dashboard = (props: dashboardProps) => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(user);

  useEffect(() => {
    if (token) {
      setLoading(false);
    } else {
      window.location.href = "/";
    }
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <NavBar name={`${userInfo?.firstName} ${userInfo?.lastName}`} />
    </div>
  );
};

export default dashboard;
