import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Twit from '../pages/Twit'
import * as Sentry from "@sentry/react";
import  {useGlobalStore} from '../Provider'
import { LOGGEDOUT } from '../config/actions';
// import ErrorBoundary from '../ErrorBoundary'

function FallbackComponent() {
    return <div>An error has occurred</div>;
}

const App = () => {
    const { LoggedIn } = useGlobalStore().state

    return (
        <Router>
            <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
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
            </Sentry.ErrorBoundary>
        </Router>
    )

}

export default App