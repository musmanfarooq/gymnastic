import { signupApi } from "@/api/userApi";
import SnackbarCustom from "@/components/Snackbar";
import { token } from "@/libs/getToken";
import { Box, CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";

const SignUp = dynamic(() => import("@/components/Signup/index"), {
  ssr: false,
});

const index = () => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastOpen, setToastOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValidEmail = (email: string) => {
    return validRegex.test(email);
  };

  const signupQuery = useMutation(
    ["signup"],
    () => signupApi(firstName, lastName, email, password),
    {
      onSuccess: (data) => {
        setSeverity("success");
        setToastMessage(
          `${data.data?.message} \n Redirecting you to login Page.`
        );
        setToastOpen(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      },
      onError: (error: any) => {
        setSeverity("error");
        setToastMessage(error.response.data.error || error.message);
        setToastOpen(true);
      },
    }
  );

  useEffect(() => {
    if (token) {
      window.location.href = "/dashboard";
    } else {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password || !firstName || !lastName) {
      setSeverity("error");
      setToastMessage("Please fill all the fields.");
      setToastOpen(true);
      return;
    }
    if (!isValidEmail(email)) {
      setSeverity("error");
      setToastMessage("Please enter a valid email address.");
      setToastOpen(true);
      return;
    }
    signupQuery.mutate();
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
      <SignUp
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
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
};

export default index;
