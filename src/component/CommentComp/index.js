import React from 'react'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default ({comment, name}) => {

    return (
        <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
                <AccountCircle />
            </Grid>
            <Grid item xs={8}>
                <p style={{fontWeight: 'bold'}}>{name}</p>
                <p>{comment}</p>
            </Grid>
        </Grid>
    )
}
