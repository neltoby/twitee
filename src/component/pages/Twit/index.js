import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import  {useGlobalStore} from '../../Provider'
import localforage from 'localforage'
import {Copyright} from '../Login'
import {MemoHeader} from '../../Header'
import {MemoPost} from '../../Post'
import { allPost } from '../../config/actions'
import { USER_DETAILS, actionCreator, userDetails } from '../../config/actions';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%'
    },
}));

export default () => {
    const classes = useStyles();
    const { state, dispatch } = useGlobalStore()

    useEffect(() => {
        if(Object.entries(state.User).length < 1){
            // localforage.getItem('user').then(function(value) {
            //     if(!Object.entries(state.User).length){
            //         dispatch(actionCreator(USER_DETAILS, value))
            //     }
            // }).catch(function(err) {
            //     const user = JSON.parse(localStorage.getItem('user'))
            //     if(user.constructor === Object && Object.entries(user).length > 0){
            //         dispatch(actionCreator(USER_DETAILS, value))
            //     }else{
            //         // This code runs if there were any errors
            //         dispatch(userDetails())
            //     }
            // });
            dispatch(userDetails())
        }else{
            console.log('its is more')
        }
        return () => {
            
        }
    }, [])

    useEffect(() => {
        dispatch(allPost())
        return () => {
        }
    }, [])

    return (
        <Grid container spacing={2}>
            <MemoHeader />
            <MemoPost /> 
            <Box mt={5}>
                <Copyright />
            </Box>             
        </Grid>           
    )
}
