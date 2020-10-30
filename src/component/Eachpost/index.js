import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CommentComp from '../CommentComp'
import { useGlobalStore } from '../Provider';
import isJson from '../config/url'

import { unlikeUpdate, likeUpdate, commentPost, deletePost } from '../config/actions'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
    textfield: {
        marginBottom: 10,
    },
    likes: {
        display: 'flex',
        justifyItems: 'space-evenly'
    }
}));

export default (props) => {
    const classes = useStyles()
    const { state, dispatch } = useGlobalStore()
    const userId = state.User.id 
    const { id, UserId, posts, createdAt } = props.item
    const Likes = isJson(props.item.Likes)
    const Comment = isJson(props.item.Comments)
    const { name } = props.item.User   
    const [comment, setComment] = useState('')
    const dateConfig = new Date(createdAt)
    const likes = Likes.find(arr => arr.UserId === userId)
    const commentName = Comment[0] ? isJson(Comment[0]) : null 
    const onChange = e => {
        setComment(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        if(comment.trim().length){
            dispatch(commentPost({postid: id, comment}))
            setComment('')
        }else{
            console.log('post cannot be empty')
        }
    }
    const unlike = () => {
        console.log('unlikw was called')
        dispatch(unlikeUpdate({userId, postId: id}))
    }
    const likeFxn = () => {
        console.log('likw was called')
        dispatch(likeUpdate(id))
    }
    const delPost =() => {
        dispatch(deletePost({userId , postId: id}))
    }
    return (
        <Grid container className={classes.paper}>
            <Grid item xs={2} >
                <AccountCircle />
            </Grid>
            <Grid item xs={8} className={classes.header}>
                <Typography component='div' className={classes.content}>
                    <p>
                        {name}
                    </p>
                    <p>{posts}</p>
                    <div className={classes.likes}>
                        {likes === undefined ? <span onClick={likeFxn}><FavoriteBorderIcon style={{ color: '#777' }} /></span> : <span onClick={unlike}> <FavoriteIcon style={{ color: 'red' }} /></span>}
                        <span>{Likes.length > 1 ? `${Likes.length} likes` : `${Likes.length} like` } </span>
                        <span>{Comment.length > 1 ? `${Comment.length} comments` : `${Comment.length} comment` }</span>
                        {userId === UserId ? <span onClick={delPost}><DeleteIcon /></span> : null}
                    </div>
                </Typography>
                <Typography component='div' className={classes.content}>
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
                        {
                            commentName !== null ? <CommentComp name={isJson(commentName.User).name} comment={commentName.comment} /> : null 
                        }
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
                </Typography>
            </Grid>
            <Grid item xs={1} className={classes.header}>
                <div className={classes.head}></div>
            </Grid>
        </Grid>
    )
}
