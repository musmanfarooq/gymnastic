"use client";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { token } from "@/libs/getToken";
import { Box, CircularProgress } from "@mui/material";
import { useMutation } from "react-query";
import { signinApi } from "@/api/userApi";
import SnackbarCustom from "@/components/Snackbar";

const SignIn = dynamic(() => import("@/components/signin"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const signinQuery = useMutation(
    ["signin"],
    () => signinApi(email, password),
    {
      onSuccess: (data) => {
        document.cookie = `authToken=${data.data.token}; path=/`;
        const expirationTime = new Date().getTime() + 1 * 100;
        document.cookie = `authTokenExpiration=${expirationTime}; path=/;`;
        window.location.href = "/dashboard";
      },
      onError: (error: any) => {
        setSeverity("error");
        setToastMessage(error.response.data.error);
        setToastOpen(true);
        console.log(error);
      },
    }
  );

  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signinQuery.mutate();
  };

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
      <SignIn
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <SnackbarCustom
        isOpen={toastOpen}
        message={toastMessage}
        severity={severity}
        handleClose={() => setToastOpen(false)}
      />
    </>
  );
}
