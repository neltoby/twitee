import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Copyright} from '../Login'
import { domain } from '../../config/url'
import  {useGlobalStore} from '../../Provider'
import localforage from 'localforage'
import { LOGGEDIN, USER_DETAILS, actionCreator } from '../../config/actions';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'stretch',
        alignItems: 'center',
        flex: 1, 
        height: '90%',
        width: '100%',   
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '50%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      [theme.breakpoints.down('md')]: {
        width: '75%'
      }
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    box: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%'
    }
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default () => {
    const classes = useStyles();
    const history = useHistory()
    const { dispatch } = useGlobalStore()
    const [disabled, setDisable] = useState(false)
    const [errEmail, setErrEmail] = useState(null)
    const [errPass, setErrPass] = useState(null)
    const [errFname, setErrFname] = useState(null)
    const [errNet, setNetErr] = useState(null)
    const [open, setOpen] = useState(false)
    // sets the input object
    const [input, setInput] = useState({fullname: '', email: '', password: ''})
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }; 
    const timeout = (val = 'email') => {
        setTimeout(() => {
            if(val === 'fname'){
                setErrFname(null)
            }else if(val === 'pass'){
                setErrPass(null)
            }else{
                setErrEmail(null)
            }
            setOpen(false)
        }, 2000);
    }

    const validation = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(input.fullname.trim().length < 2) {
            setErrFname("Fullname field must be atleast 2 character");
            timeout('fname')
            setOpen(true)
            return false
        }
        if(input.password.trim().length < 6) {
            setErrPass("Password field cannot be less than six characters");
            timeout('pass')
            setOpen(true)
            return false
        }
        if(!input.email || reg.test(input.email) === false) {
            setErrEmail("Email Field is Invalid");
            timeout('email')
            setOpen(true)
            return false;
        }
        return true;
    }
    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log('i was called')
        if(validation()){
            setDisable(true)
            const param = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(input)
            }
            fetch(`${domain}twits/register`, param)
            .then(res => {
                for (let val of res.headers.entries()){
                    if(val[0] === 'token'){
                        cookies.set('twit_token', val[1], { path: '/' });
                        console.log(cookies.get('twit_token'));
                    }
                }               
                if(res.status === 200 || res.status === 201){ 
                    for (let val of res.headers.entries()){
                        if(val[0] === 'token'){
                            cookies.set('twit_token', val[1], { path: '/' });
                            console.log(cookies.get('twit_token'));
                        }
                    }                                                
                }
                return res.json() 
            })
            .then(resp => {
                const token = cookies.get('twit_token')
                if(token !== null && token !== undefined){
                    delete resp.password
                    localforage.setItem('user', resp).then(function(value) {
                        dispatch(actionCreator(LOGGEDIN))
                        dispatch(actionCreator(USER_DETAILS, resp))
                        history.push('/')           
                    }).catch(function(err) {
                        localStorage.setItem('user', JSON.stringify(resp))
                        dispatch(actionCreator(LOGGEDIN))
                        dispatch(actionCreator(USER_DETAILS, resp))
                        history.push('/')   
                        // implement saving to localStorage 
                    })                                      
                }else{
                    setNetErr(resp.msg)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setNetErr(null)
                    }, 2000)
                }
                setDisable(false) 
            })
            .catch(err => {
                console.log(err.message)
                setDisable(false)
                setOpen(true)
                // set network err 
                setNetErr(err.message)
                setTimeout(() => {
                    setOpen(false)
                }, 2000);
            })
        }else{
            console.log(';validation failed')
        }
    }

    return (
        <Grid className={classes.container} container spacing={2}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>

                        <TextField
                            autoComplete="fname"
                            margin="normal"
                            name="fullname"
                            variant="outlined"
                            required
                            fullWidth
                            id="fullname"
                            label="Full Name"
                            autoFocus
                            value = {input.name}
                            onChange = {onChange}
                        />
                        {/* <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                        />
                        </Grid> */}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            onChange = {onChange}
                            value = {input.email}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange = {onChange}
                            value = {input.password}
                        />
                            <FormControlLabel
                                control={<Checkbox value="allowSignedin" color="primary" />}
                                label="Always keep me signed in"
                            />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={disabled}
                    >
                        {disabled ? 'Loading' : 'Sign Up'}
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="/login" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid>
                </form>
                
            </div>
            <Box className={classes.box} mt={5}>
                <Copyright />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success">
                    {errEmail !== null ? errEmail : errPass !== null ? errPass : errFname ? errFname : errNet }
                </Alert>
            </Snackbar>
        </Grid>
    )
}
