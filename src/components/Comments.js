import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid, TextField } from '@material-ui/core';
import { createComment, getProductComments } from '../actions/commentsAction';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export default function Comments({product, parentHeight, factor}) {
    const classes = useStyles();
    const [comments, setComments] = useState(product.comments);
    const {user} = useSelector((state) => state.auth);
    const [comment, setComment] = useState("");

    async function initProductComments() {
        getProductComments(product.id)
          .then((comments) => {
            console.log("comments", comments);
              const rows = comments ? comments : [];
              setComments(rows);
          });
    }

    const saveClickHandler = async () => {
        const payload = {  
            body: comment,
            client_id: user.id,
            product_id: product.id
        }
        createComment({comment: payload, initProductComments});
    };

    const handleChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <>
            <List 
                className={classes.root}
                style={{
                    maxHeight: parentHeight && factor ? `${ (parentHeight - (parentHeight/factor)) - 12}vh` : 200,
                    overflow: 'auto'
                }}
            >
                {comments.map((comment) => (
                    <React.Fragment  key={comment.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar 
                                    alt={`${comment.client.firstName}, ${comment.client.lastName}`}
                                    src="/static/images/avatar/1.jpg"
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${comment.client.firstName}, ${comment.client.lastName}`}
                                secondary={`${comment.body}`}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </ React.Fragment>
                ))}
            </List>
            {user.userType.localeCompare("CLIENT") === 0 && (
                <Grid container>
                    <Grid>
                        <TextField
                            key={`input${product.id}`}
                            variant="outlined"
                            margin="normal"
                            name="comment"
                            defaultValue={comment}
                            title="comment"
                            label="comment"
                            type="text"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid style={{marginTop:'3vh'}}>
                        <Button color="secondary" key={`submit${product.id}`} onClick={saveClickHandler}>submit</Button>
                    </Grid>
                </Grid>
            )}    
        </>
    );
}
