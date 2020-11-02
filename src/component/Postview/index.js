import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../Provider'
import EachPost from '../Eachpost'

const useStyles = makeStyles((theme) => ({
    div: {
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        [theme.breakpoints.down('md')]: {
            width: '90%'
        }        
    },
}));

export default function index() {
    const classes = useStyles()
    const {state, dispatch} = useGlobalStore()
    const post = useMemo(() => state.Post,[state.Post])

    return (
        <div className={classes.div}>
            {
                post.map((item, i) => <EachPost item={item} key={i} />)
            }
        </div>
    )
}

