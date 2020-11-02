import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../Provider';
import {newPost} from '../config/actions'

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function PostText() {
    const classes = useStyles()
    const { dispatch } = useGlobalStore()
    const [ post, setPost ] = useState('')
    const onChange = e => {
        setPost(e.target.value)
    }
    const onSubmit = (e)=> {
        e.preventDefault()        
       dispatch(newPost(post))
       setPost('')
    }  
    return (
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
    )
}
