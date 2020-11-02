import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Time from '../Time'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: 0,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    content: {
        width: '100%'
    },
}));

export default function PostHead ({name, createdAt}) {
    const classes = useStyles()
    return (
        <Grid container className={classes.paper}>
            <Grid item xl={2} lg={2} md={2} xs={2} >
                <AccountCircle style={{ fontSize: 50, color: '777' }}/>
            </Grid>
            <Grid item container xl={10} lg={10} md={10} xs={10} className={classes.header}>
                <Typography component='div' className={classes.content}>
                    <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                        <span style={{fontWeight: 'bold'}}>{name}</span>
                        <Time date={createdAt} />
                    </div>
                </Typography>
            </Grid>
        </Grid>
    )
}

export const PostHeader = memo(PostHead)
