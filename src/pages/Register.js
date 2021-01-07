import React, { useState } from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBAnimation
} from "mdbreact";
import "../utils/index.css";
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Link } from '@material-ui/core';
import { startRegister } from "../actions/registerAction";

const useStyles = makeStyles((theme) =>
  createStyles({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
  })
);
export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {errors: errors_res} = useSelector((state) => state.auth);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

  async function register() {
    dispatch(startRegister({firstName, lastName, email, password, cPassword, phoneNumber}))
  }
  return (
    <div id="classicformpage">
      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <MDBAnimation
                type="fadeInLeft"
                delay=".3s"
                className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
              >
                <h1 className="h1-responsive font-weight-bold">
                  Sign up right now!
                </h1>
                <hr className="hr-light" />
                <h6 className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Rem repellendus quasi fuga nesciunt dolorum nulla magnam
                  veniam sapiente, fugiat! Commodi sequi non animi ea dolor
                  molestiae, quisquam iste, maiores. Nulla.
                </h6>
                <MDBBtn outline color="cyan">
                  Learn More
                </MDBBtn>
              </MDBAnimation>

              <MDBCol md="6" xl="5" className="mb-4">
                <MDBAnimation type="fadeInRight" delay=".3s">
                  <MDBCard id="classic-card">
                    <MDBCardBody className="white-text">
                      <h3 className="text-center">
                        <MDBIcon icon="user" /> Sign Up:
                      </h3>
                      <hr className="hr-light" />
                      <form className={classes.form} noValidate>
                        {errors_res.find((x) => x.name.localeCompare('firstName') === 0) && (
                          <Typography color="error">
                            {errors_res.find((x) => x.name.localeCompare('firstName') === 0)?.message}
                          </Typography>
                        )}
                        <TextField
                          autoComplete="firstName"
                          name="firstName"
                          
                          required
                          fullWidth
                          id="firstName"
                          label="firstName"
                          autoFocus
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors_res.find((x) => x.name.localeCompare('lastName') === 0) && (
                          <Typography color="error">
                            {errors_res.find((x) => x.name.localeCompare('lastName') === 0)?.message}
                          </Typography>
                        )}
                        <TextField
                          autoComplete="lastName"
                          name="lastName"
                          
                          required
                          fullWidth
                          id="lastName"
                          label="lastName"
                          autoFocus
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors_res.find((x) => x.name.localeCompare('email') === 0) && (
                          <Typography color="error">
                            {errors_res.find((x) => x.name.localeCompare('email') === 0)?.message}
                          </Typography>
                        )}
                        <TextField
                          
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors_res.find((x) => x.name.localeCompare('password') === 0) && (
                          <Typography color="error">
                            {errors_res.find((x) => x.name.localeCompare('password') === 0)?.message}
                          </Typography>
                        )}
                        <TextField
                          
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors_res.find((x) => x.name.localeCompare('c_password') === 0) && (
                          <Typography color="error">
                            {errors_res.find((x) => x.name.localeCompare('c_password') === 0)?.message}
                          </Typography>
                        )}
                        <TextField
                          
                          margin="normal"
                          required
                          fullWidth
                          name="cPassword"
                          label="Confirm Password"
                          type="password"
                          id="cPassword"
                          autoComplete="current-password"
                          onChange={(e) => setCPassword(e.target.value)}
                        />
                        {errors_res.find((x) => x.name.localeCompare('phoneNumber') === 0) && (
                          <Typography color="error">
                            {errors_res.find((x) => x.name.localeCompare('phoneNumber') === 0)?.message}
                          </Typography>
                        )}
                        <TextField
                          autoComplete="phoneNumber"
                          name="phoneNumber"
                          
                          required
                          fullWidth
                          id="phoneNumber"
                          label="Phone Number"
                          autoFocus
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={register}
                        >
                          Sign up
                        </Button>
                        <Grid container>
                          <Grid item>
                            <Link href="/login" variant="body2">
                              {" Already have an account? Login"}
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </MDBCardBody>
                  </MDBCard>
                </MDBAnimation>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>
    </div>
  );
}