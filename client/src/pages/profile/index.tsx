import { getUserInfo } from "@/api/userApi";
import NavBar from "@/components/Appbar";
import SnackbarCustom from "@/components/Snackbar";
import { token, user } from "@/libs/getToken";
import {
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Linked } from "./profileStyles";
import UserInfo from "@/components/pages/profile/UserInfo";

const index = () => {
  const [loading, setLoading] = useState(true);
  const [getUser, setGetUser] = useState<any>(user);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const getInfo = useMutation(["getuserinfo"], () => getUserInfo(), {
    onSuccess: (data) => {
      setSeverity("success");
      console.log(data);
    },
    onError: (error: any) => {
      setSeverity("error");
      setToastMessage(error.response.data.error || error.message);
      setToastOpen(true);
    },
  });

  useEffect(() => {
    if (token) {
      setLoading(false);
      getInfo.mutate();
    } else {
      window.location.href = "/";
    }
  }, [token]);

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
    <>
      <NavBar name={`${getUser?.firstName} ${getUser?.lastName}`} />
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          maxWidth: "650px",
          margin: "30px auto",
        }}
      >
        <Grid item xs={4}>
          <Linked>User Info</Linked>
          <Linked>Update Password</Linked>
        </Grid>
        <Grid item xs={8}>
          <UserInfo/>
        </Grid>
      </Grid>
      <SnackbarCustom
        isOpen={toastOpen}
        message={toastMessage}
        severity={severity}
        handleClose={() => setToastOpen(false)}
      />
    </>
  );
};

export default index;
