import React from 'react'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

export default ({comment, name, date}) => {

    return (
        <Grid container>
            <Grid item xs={2}>
                <AccountCircle />
            </Grid>
            <Grid item xs={10}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}><span style={{fontWeight: 'bold'}}>{name}</span><span>{date}</span></div>
                <p>{comment}</p>
            </Grid>
        </Grid>
    )
}
