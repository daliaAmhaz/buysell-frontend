import React, { memo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

const AdminForm = memo((props) => {
  const { state, setState } = props;
  const {errors: errors_res} = useSelector((state) => state.auth);


  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('firstName') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="firstName"
            name="firstName"
            defaultValue={state.firstName}
            title="firstName"
            label="firstName"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('lastName') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="lastName"
            name="lastName"
            defaultValue={state.lastName}
            title="lastName"
            label="lastName"
            type="text"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('email') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('password') === 0)?.message}
          </Typography>
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
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography color="error">
            {errors_res.find((x) => x.name.localeCompare('c_password') === 0)?.message}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="cPassword"
            label="Confirm Password"
            type="password"
            id="cPassword"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </Grid>        
      </Grid>
    </div>
  );
});

export default AdminForm;