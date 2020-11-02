import React, { useState } from 'react'
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
import { domain } from '../../config/url'
import  {useGlobalStore} from '../../Provider'
import localforage from 'localforage'
import { useHistory } from 'react-router-dom'
import { LOGGEDIN, USER_DETAILS, actionCreator } from '../../config/actions';
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();


export const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
      </Typography>
    );
  }
  
const useStyles = makeStyles((theme) => ({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    typo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'space-around',
        justifyContent: 'space-around',
        width: '100%'
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default () => {
    const { dispatch } = useGlobalStore()
    const history = useHistory()
    const classes = useStyles()
    const [input, setInput] = useState({email: '', password: ''})
    const [ errEmail, setErrEmail] = useState(null)
    const [ errPass, setErrPass] = useState(null)
    const [ errNet, setNetErr] = useState(null)
    const [open, setOpen] = useState(false)
    const [button_disable, setButton] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    }; 

    const onChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const timeout = (val = false) => {
        setTimeout(() => {
            if(val){
                setErrEmail(null)
            }else{
                setErrPass(null)
            }
            setOpen(false);
        }, 2000);
    }
    const validation = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(input.password.trim().length < 6) {
            setErrPass("Password field cannot be less than six characters");
            setOpen(true);
            timeout()
            return false
        }
        if(!input.email || reg.test(input.email) === false) {
            setErrEmail("Email Field is Invalid");
            setOpen(true);
            timeout(1)
            return false;
        }
        return true;
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const param = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(input)
        }
        if(validation()){
            setButton(true)
            fetch(`${domain}twits/login`, param)
            .then(res => {      
                if(res.status === 200 || res.status === 201){          
                    for (let val of res.headers.entries()){
                        if(val[0] === 'token'){
                            cookies.set('twit_token', val[1], { path: '/' });
                        }else{
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
                        try{
                            localStorage.setItem('user', JSON.stringify(resp))
                            dispatch(actionCreator(LOGGEDIN))
                            dispatch(actionCreator(USER_DETAILS, resp))
                            history.push('/')
                        }catch(e) {

                        }
                        
                        // implement saving to localStorage 
                    });                   
                }else{
                    setNetErr(resp.msg)
                    setOpen(true)
                    setTimeout(() => {
                        setOpen(false)
                        setNetErr(null)
                    }, 2000)
                }
                setButton(false)
            })
            .catch(err => {
                // set network err 
                setButton(false)
                setNetErr(err.message)
                setTimeout(() => {
                    setOpen(false)
                    setNetErr(null)
                }, 2000)
            })
        }
    }

    return (
        <Grid className={classes.container} container spacing={2}>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={onChange}
                        value={input.email}
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
                        value={input.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={button_disable}
                        data-testid='submit-button'
                    >
                        {button_disable ? 'Loading' : 'Sign In'}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="success">
                    {errEmail !== null ? errEmail : errPass !== null ? errPass : errNet }
                </Alert>
            </Snackbar>
        </Grid>
    )
}
