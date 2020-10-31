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
      flexDirection: 'row',
      alignItems: 'center',
    },
    textfield: {
        marginBottom: 10,
    },
    likes: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    }, 
    content: {
        width: '100%'
    },
    margintop: {
        width: '100%',
        marginTop: 15
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
    const unlike = () => {
        dispatch(unlikeUpdate({userId, postId: id}))
    }
    const likeFxn = () => {
        dispatch(likeUpdate(id))
    }
    const delPost =() => {
        dispatch(deletePost({userId , postId: id}))
    }
    return (
        <>
        <Grid container className={classes.paper}>
            <Grid item xl={2} lg={2} md={2} xs={2} >
                <AccountCircle />
            </Grid>
            <Grid item container xl={10} lg={10} md={10} xs={10} className={classes.header}>
                <Typography component='div' className={classes.content}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontWeight: 'bold'}}>{name}</span>
                        <span>{dateConfig.toDateString()}</span>
                    </div>
                </Typography>
            </Grid>
        </Grid>
        <Grid container className={classes.margintop}>
        <Grid item xl={2} lg={2} md={2} xs={2} >
        </Grid>
        <Grid item container xl={10} lg={10} md={10} xs={10} className={classes.header}>
            <Typography component='div' className={classes.content}>
                <p>{posts}</p>
                <div className={classes.likes}>
                    {likes === undefined ? <span onClick={likeFxn}><FavoriteBorderIcon style={{ color: '#777' }} />
                    {Likes.length > 1 ? `${Likes.length} likes` : `${Likes.length} like` }
                    </span> : <span onClick={unlike}> <FavoriteIcon style={{ color: 'red' }} />
                    {Likes.length > 1 ? `${Likes.length} likes` : `${Likes.length} like` }
                    </span>}                   
                    <span>{Comment.length > 1 ? `${Comment.length} comments` : `${Comment.length} comment` }</span>
                    {userId === UserId ? <span onClick={delPost}><DeleteIcon /></span> : null}
                </div>
            </Typography>
            <Typography component='div' className={classes.content}>
                {
                    Comment.map((item, i) => {
                        let commentName = isJson(item)
                        let date = new Date(commentName.createdAt).toDateString()
                        return <CommentComp key={i} name={isJson(commentName.User).name} comment={commentName.comment} date={date} />
                    })
                }
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
            </Typography>
        </Grid>
    </Grid>
    </>
    )
}
