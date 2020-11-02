import React from 'react'
import Grid from '@material-ui/core/Grid';
import {Time} from '../Time'
import AccountCircle from '@material-ui/icons/AccountCircle';

export default ({comment, name, date}) => {
    return (
        <Grid container>
            <Grid item xs={2}>
                <AccountCircle style={{ fontSize: 30, color: '777' }} />
            </Grid>
            <Grid item xs={10}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{fontWeight: 'bold'}}>{name}</span><Time date={date} /></div>
                <p>{comment}</p>
            </Grid>
        </Grid>
    )
}
