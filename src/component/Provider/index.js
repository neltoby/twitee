import React from 'react'
import ErrorBoundary from '../ErrorBoundary'
import reducer from '../config/reducer'
import { LOGGEDOUT, LOGGEDIN } from '../config/actions'
import Cookies from 'universal-cookie';
 
const cookies = new Cookies();

export const Store = React.createContext()

export const useGlobalStore = () => React.useContext(Store)

// retrieve token from cookie
const token = cookies.get('twit_token')

const initialState = {
    LoggedIn: token !== null && token !== undefined ? LOGGEDIN : LOGGEDOUT , 
    User: {}, 
    Post: [],
    network: null,
    loadingPost: false,
}

// creating a custom thunk
const asyncRed = (dispatch, state) => action => typeof action === 'function' ? action(dispatch, state) : dispatch(action)

const Provider = ({children}) => {
    const [ state, dispatchBase ] = React.useReducer(reducer, initialState)
    const dispatch = React.useCallback(asyncRed(dispatchBase, state), [])

    return(
        <Store.Provider value={{state, dispatch}}>
            <ErrorBoundary ui={<h1>Something went wrong</h1>}>
                {children}
            </ErrorBoundary>
        </Store.Provider>
    )
}

export default Provider