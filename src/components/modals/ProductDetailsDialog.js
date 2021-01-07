import React from "react";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { CardContent, Dialog, Typography } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { MyMapComponent } from "../Map";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export function ProductDetailsDialog({ product, open, handleClose }) {
  const classes = useStyles();

  function FormRow({header, body}) {
    return (
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          <Typography paragraph component="h6" variant="h6" style={{color: "black"}}>{header}</Typography>
          <Typography paragraph>
            {body}
          </Typography>
        </Paper>
      </Grid>
    );
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
        <CardContent>
          <div className={classes.root}>
            <Grid container spacing={1}>
              <FormRow header="Name" body={product.name}/>
              <FormRow header="Description" body={product.description}/>
              <FormRow header="Seller Name" body={`${product.client.firstName}, ${product.client.lastName}`}/>
              <FormRow header="remaining items" body={product.remaining}/>
              <FormRow header="Price" body={product.price}/>
              <FormRow
                header="Categories" 
                body={
                  product.categories.map((data) => (
                      <Typography paragraph key={data.id}>
                        {data.name}
                      </Typography>
                  ))
                }
              />
              { product.isSold ?
                <Grid>
                  <Paper className={classes.paper}>
                    <Typography paragraph>This product is sold</Typography>
                  </Paper>
                </Grid>
                :
                <></>
              }
              { product.isNegotiable ?
                <Grid>
                  <Paper className={classes.paper}>
                    <Typography paragraph>This product is Negotiable</Typography>
                  </Paper>
                </Grid>
                :
                <></>
              }
              <Grid>
                <MyMapComponent
                  product={product}
                  isMarkerShown
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCN5OsEo4X3nhZRqULlCjBJY2wYocAzrFI&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Grid>
            </Grid>
          </div>
        </CardContent>      
    </Dialog>
  );
}
