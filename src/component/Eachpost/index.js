import React, { useMemo, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CommentComp from '../CommentComp'
import {PostHeader} from '../PostHead'
import {PostCountFxn} from '../PostCounts'
import { PostCommentFxn } from '../PostComment'
import { useGlobalStore } from '../Provider';
import isJson from '../config/url'

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
    const { state } = useGlobalStore()
    const userId = state.User.id 
    const { id, UserId, posts, createdAt } = props.item
    const Likes = isJson(props.item.Likes)
    const Comment = isJson(props.item.Comments)
    const { name } = props.item.User       
    const like = Likes.find(arr => arr.UserId === userId)
    const likes = Likes.length
    const comments = Comment.length 
      
    return (
        <>
        <PostHeader name={name} createdAt={createdAt} />
        <Grid container className={classes.margintop}>
        <Grid item xl={2} lg={2} md={2} xs={2} >
        </Grid>
        <Grid item container xl={10} lg={10} md={10} xs={10} className={classes.header}>
            <PostCountFxn 
                posts={posts} 
                like={like} 
                likes={likes}
                comments={comments}
                UserId={UserId}
                id={id} 
            />
            <Typography component='div' className={classes.content}>
                {
                    Comment.map((item, i) => {
                        let commentName = isJson(item)
                        return <CommentComp key={i} name={isJson(commentName.User).name} comment={commentName.comment} date={commentName.createdAt} />
                    })
                }
                <PostCommentFxn id={id}/>
            </Typography>
        </Grid>
    </Grid>
    </>
    )
}
