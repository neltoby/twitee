import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Twit from '../pages/Twit'
import  {useGlobalStore} from '../Provider'
import { LOGGEDOUT } from '../config/actions';
import ErrorBoundary from '../ErrorBoundary'


const App = () => {
    const { LoggedIn } = useGlobalStore().state
    console.log(LoggedIn)
    console.log(useGlobalStore().state)

    return (
        <Router>
            <ErrorBoundary ui={<h1>Something went wrong</h1>}>
                {LoggedIn === undefined || LoggedIn === LOGGEDOUT ?
                    <Switch>                       
                        <Route path='/login'><Login /></Route>
                        <Route path='/signup'><SignUp /></Route>
                        <Redirect from='/*' to='/signup' />
                    </Switch>
                    : 
                    <Switch>
                        <Redirect from='/signup' to='/' /> 
                        <Redirect from='/login' to='/' />                         
                        <Route path='/'><Twit /></Route>             
                        <Redirect from='/*' to='/' />                     
                    </Switch>
                }
            </ErrorBoundary>
        </Router>
    )

}

export default App