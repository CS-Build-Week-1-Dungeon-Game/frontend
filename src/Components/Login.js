import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import { ToastContainer } from "react-toastify";

import { loginOrRegister } from "../utils";
import { useFormStyles } from "../hooks";

export default function Login(props) {
  const classes = useFormStyles();
  const [user, setUser] = useState({ username: "", password: "" });

  function inputHandler(event) {
    const updatedUser = { ...user, [event.target.name]: event.target.value };
    setUser(updatedUser);
  }

  function submitHandler(event) {
    event.preventDefault();
    loginOrRegister("/api/registration", user, props.history);
  }
  return (
    <Grid container component="main" className={classes.root}>
      <ToastContainer />
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CodeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={submitHandler} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={user.username}
              onChange={inputHandler}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={inputHandler}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/register">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
