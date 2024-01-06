import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";

const UserInfo = () => {
  return (
    <div>
      <Box
        component="form"
        noValidate
        // onSubmit={props.handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
              // value={props.firstName}
              // onChange={(e) => props.setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              // value={props.lastName}
              // onChange={(e) => props.setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              // value={props.email}
              // onChange={(e) => props.setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="address"
              label="Address"
              name="Address"
              autoComplete="off"
              // value={props.email}
              // onChange={(e) => props.setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="age"
              label="age"
              type="number"
              id="age"
              // value={props.password}
              // onChange={(e) => props.setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="weight"
              label="weight"
              type="number"
              id="weight"
              // value={props.password}
              // onChange={(e) => props.setPassword(e.target.value)}
            />
          </Grid>
          <Grid xs={12}>
            <Typography
              fontSize={"12px"}
              paddingLeft={2}
              marginTop={"12px"}
              sx={{ fontWeight: "bold" }}
            >
              Height
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="ft"
              label="ft"
              type="number"
              id="ft"
              // value={props.password}
              // onChange={(e) => props.setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              name="in"
              label="in"
              type="number"
              id="in"
              // value={props.password}
              // onChange={(e) => props.setPassword(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled
        >
          Update
        </Button>
      </Box>
    </div>
  );
};

export default UserInfo;
