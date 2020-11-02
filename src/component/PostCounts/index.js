import React, { memo } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import Typography from '@material-ui/core/Typography';
import { useGlobalStore } from '../Provider'
import { makeStyles } from '@material-ui/core/styles';
import { unlikeUpdate, likeUpdate, deletePost } from '../config/actions'

const useStyles = makeStyles((theme) => ({
    likes: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
    }, 
    content: {
        width: '100%'
    },
}));

export default function PostCount({posts, likes, like, comments, UserId, id}) {
    const classes = useStyles()
    const { state, dispatch } = useGlobalStore()
    const userId = state.User.id 

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
        <Typography component='div' className={classes.content}>
            <p>{posts}</p>
            <div className={classes.likes}>
                {like === undefined ? <span onClick={likeFxn}><FavoriteBorderIcon style={{ color: '#777' }} />
                {likes > 1 ? `${likes} likes` : `${likes} like` }
                </span> : <span onClick={unlike}> <FavoriteIcon style={{ color: 'red' }} />
                {likes > 1 ? `${likes} likes` : `${likes} like` }
                </span>}                   
                <span>{comments > 1 ? `${comments} comments` : `${comments} comment` }</span>
                {userId === UserId ? <span onClick={delPost}><DeleteIcon /></span> : null}
            </div>
        </Typography>
    )
}

export const PostCountFxn = memo(PostCount)
