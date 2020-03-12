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

import { loginOrRegister } from "../utils";
import { useFormStyles } from "../hooks";

export default function Register(props) {
  const classes = useFormStyles();
  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
    username: ""
  });

  const registerUser = newUser => {
    loginOrRegister("/api/registration", newUser, props.history);
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
      registerUser(inputs);
    }
  };

  const handleChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  return (
    <Grid container component="main" className={classes.root}>
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
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={inputs.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type="password"
              id="password"
              value={inputs.password1}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              value={inputs.password2}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link className={classes.link} to="/">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
