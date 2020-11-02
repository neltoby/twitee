import React, { memo, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import Postview from '../Postview'
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../Provider';
import PostText from '../PostText'

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
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

export default function Post(){
    const classes = useStyles();
    const { state } = useGlobalStore()
     return (
        <Grid container spacing={2}>
            <Grid item lg={3} md={false} xs={false} sm={false}>
            </Grid>
            <Grid item lg={6} md={12} xs={12} sm={12} className={classes.content}>
                <PostText />
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
            <Grid item lg={3} md={false} xs={false} sm={false}>
            </Grid>
        </Grid>
    )
}
export const MemoPost = memo(Post)