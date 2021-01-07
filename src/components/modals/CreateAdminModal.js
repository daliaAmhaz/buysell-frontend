import React, { memo, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";

import { createAdmin, setError } from "../../actions/adminsAction";
import { CardContent, Dialog } from "@material-ui/core";
import AdminForm from "../forms/AdminForm";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) =>
  createStyles({
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const CreateAdminModal = memo(({ initAdmins, open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const [state, setState] = useState(initialState);

  const { handleSubmit } = useForm();

  const handleFormClose = () => {
    setState(initialState);
    //empty errors
    dispatch(setError([]));
    onClose();
  };

  const saveClickHandler = async () => {
    if(state.password.length < 6) {alert("Password shuld be at least 6 characters")}
    else {
      if(state.cPassword.length < 6 || state.cPassword.localeCompare(state.password) !== 0 ) {
        alert("Confirm password should match password, and Confirm password shuld be at least 6 characters")
      } else {
        const payload = {
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          password: state.password,
          cPassword: state.cPassword,
        };
        //handleFormClose();
        dispatch(createAdmin({admin: payload, initAdmins}));
      }
    }
    
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleFormClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <CardContent>
          <div className={classes.root}>
            <h2 id="simple-modal-title">
                <AddBoxIcon /> Create Admin
            </h2>
            <form onSubmit={handleSubmit(saveClickHandler)}>
              <AdminForm
                  state={state}
                  setState={setState}
              />
              <div className={classes.buttons}>
              <Button type="submit" variant="contained" color="primary">
                  Save
              </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Dialog>
    </div>
  );
});

export default CreateAdminModal;