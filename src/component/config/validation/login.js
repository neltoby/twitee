import React from 'react'
import localforage from 'localforage'
import { useGlobalStore } from '../../Provider'
import { actionCreator, LOGGEDIN } from '../actions'

export default function useLogin () {
    const { dispatch } = useGlobalStore()
    const loginFxn = () => {
        localforage.getItem('twit_login').then(function(value) {
            dispatch(actionCreator(LOGGEDIN))
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);
        });
    }
    return loginFxn   
}