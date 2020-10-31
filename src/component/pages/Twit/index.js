import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
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
        localforage.getItem('user').then(function(value) {
            if(!Object.entries(state.User).length){
                dispatch(actionCreator(USER_DETAILS, value))
            }
        }).catch(function(err) {
            // This code runs if there were any errors
            dispatch(userDetails())

        });
        return () => {
            
        }
    }, [])

    useEffect(() => {
        dispatch(allPost())
        return () => {
        }
    }, [])

    return (
        <Container component="main" maxWidth="lg">
            <Grid container spacing={2}>
                <MemoHeader />
                <MemoPost /> 
                <Box mt={5}>
                    <Copyright />
                </Box>             
            </Grid>
        </Container>
            
    )
}
