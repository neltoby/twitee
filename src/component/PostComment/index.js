import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useGlobalStore } from '../Provider';
import { commentPost  } from '../config/actions'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    textfield: {
        marginBottom: 10,
    }
}));

export default function PostComment({id}) {
    const classes = useStyles()
    const [comment, setComment] = useState('')
    const { dispatch } = useGlobalStore()

    const onChange = e => {
        setComment(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if(comment.trim().length){
            dispatch(commentPost({postid: id, comment}))
            setComment('')
        }else{
        }
    }
    return (
        <form className={classes.form} onSubmit={onSubmit}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="comment"
                type="text"
                label="Comment..."
                name="comment"
                autoComplete="comment"
                onChange = {onChange}
                value = {comment}
                className={classes.textfield}
            />                       
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                data-testid='submit-button'
            >
                Comment
            </Button>
        </form>
    )
}

export const PostCommentFxn = memo(PostComment)