import React, { memo, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Postview from '../Postview'
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../Provider';
import {allPost, newPost} from '../config/actions'

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function Post(){
    const classes = useStyles();
    const [ post, setPost ] = useState('')
    const { state, dispatch } = useGlobalStore()
    const onChange = e => {
        setPost(e.target.value)
    }
    const onSubmit = (e)=> {
        e.preventDefault()        
       dispatch(newPost(post))
       setPost('')
    }   
     return (
        <Grid container spacing={2}>
            <Grid item md={3} xs={false} sm={false}>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        multiline
                        rows={4}
                        name="post"
                        variant="outlined"
                        required
                        fullWidth
                        id="post"
                        label="Post a thought"
                        placeholder="Post a thought"
                        autoFocus
                        value = {post}
                        onChange = {onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Post
                    </Button>
                </form>
                {state.loadingPost ?
                    <h4>Loading...</h4>
                    :
                    state.Post.length ?                    
                        <Postview />
                        :
                        <div>There are no post at the moment. 
                            You could post a thought
                        </div>
                } 
            </Grid>
            <Grid item md={3} xs={false} sm={false}>
            </Grid>
        </Grid>
    )
}
export const MemoPost = memo(Post)