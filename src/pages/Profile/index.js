import React, {useEffect, useState} from 'react';
import { Grid } from '@material-ui/core';
import Page from '../../components/Page';
import {setError, startUpdateClient} from '../../actions/clientsAction';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import UpdateClientForm from './UpdateClientForm';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { getClient } from '../../actions/clientsAction';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
  }),
);

const Client = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {isLoading, user} = useSelector((state) => state.auth);

  const initialState = {
    id: user.id,
    firstName: "",
    lastName: "",
    image: null,
    phoneNumber: "",
  };
  
  const [state, setState] = useState(initialState);

  const { handleSubmit } = useForm();

  async function initClient() {
    getClient(user.id)
      .then((clientRes) => {
        console.log("clientRes", clientRes)
        setState({ 
          ...state, 
          firstName : clientRes.firstName,
          lastName : clientRes.lastName,
          phoneNumber : clientRes.phoneNumber
        });
      });
  }
  useEffect(() => {
    initClient();
  }, [isLoading]);

  const handleFormClose = () => {
    //empty errors
    dispatch(setError([]));
  };

  const saveClickHandler = async () => {
    console.log("statestarte", state)
    const payload = {
        id: state.id,
        firstName: state.firstName,
        lastName: state.lastName,
        phoneNumber: state.phoneNumber,
    };
    handleFormClose();
    dispatch(startUpdateClient({client: payload}));
    
  };



  return (
    <Page>
      <div style={{  padding: 10, marginLeft: 500 }}>
        <Card className={classes.root}>
          <CardHeader
              title={`${user.firstName} ${user.lastName}`}
              subheader={`${user.email}`}
          />
          {user.userType.localeCompare("CLIENT") === 0 && ("phoneNumber" in user) &&(
            <>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Phone Number: {user.phoneNumber}
                </Typography>
            </CardContent>
            <CardContent>
              <form onSubmit={handleSubmit(saveClickHandler)}>
                <CardHeader title="Edit " />
                <CardContent>
                  <Grid
                      container
                      justify="space-evenly"
                      alignItems="center"
                  >
                  <UpdateClientForm
                      state={state}
                      setState={setState}
                  />
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                      variant="contained"
                      size="large"
                      color="secondary"
                      type="submit"
                  >
                      Update
                  </Button>
                </CardActions>
              </form>
            </CardContent>
          </>
          
          )}
      </Card>
      </div>
    </Page>
  );
}

export default Client;
