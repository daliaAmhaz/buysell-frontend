import React, {memo} from 'react';
import { Grid } from '@material-ui/core';
import {useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const UpdateClientForm = memo((props) => {
  const {errors: errors_res} = useSelector((state) => state.auth);
  const { state, setState } = props;

  const handleChange = (event) => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('firstName') === 0)?.message}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="firstName"
          name="firstName"
          value={state.firstName}
          title="firstName"
          label="firstName"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('lastName') === 0)?.message}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="lastName"
          name="lastName"
          value={state.lastName}
          title="lastName"
          label="lastName"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography color="error">
          {errors_res.find((x) => x.name.localeCompare('phoneNumber') === 0)?.message}
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="phoneNumber"
          name="phoneNumber"
          value={state.phoneNumber}
          title="phoneNumber"
          label="phoneNumber"
          type="text"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
})

export default UpdateClientForm;
