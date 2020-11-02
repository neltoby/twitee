import Cookies from 'universal-cookie';
import localforage from 'localforage'
import { domain } from '../url'
 
const cookies = new Cookies();
export const LOGGEDOUT = 'LOGGEDOUT'
export const LOGGEDIN = 'LOGGEDIN'
export const USER_DETAILS = 'USER_DETAILS' 
export const ALL_POST = 'ALL_POST'
export const NEW_POST = 'NEW_POST'
export const LIKE_POST = 'LIKE_POST'
export const UNLIKE_POST = 'UNLIKE_POST'
export const COMMENT = 'COMMENT'
export const NETWORK_ERR = 'NETWORK_ERR'
export const LOAD_POST = 'LOAD_POST'
export const DELETE_POST = 'DELETE_POST'

// action creators for all action types
export const actionCreator = (action, payload = null) => {
    if(payload === null){
        return {type: action}
    }else{
        return {type: action, payload}
    }   
}

// login action creator
export const log = payload => {
    return
}

const timeout = (fxn) => {
    setTimeout(() => {
        fxn(actionCreator(NETWORK_ERR, null))
    })
}

export const userDetails = () => {
    return dispatch => {
        (() => {
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'GET',
            }
            fetch(`${domain}twits/user`,param)
            .then(res => res.json())
            .then(resp => {
                if(resp.msg === undefined){
                    delete resp.password
                    dispatch(actionCreator(USER_DETAILS, resp))
                    localforage.setItem('user', resp, function(err, value){
                        if(value){
                           
                        }else{
                            localStorage.setItem('user', JSON.stringify(resp))
                        }
                    })
                }else{

                }
            })
            .catch(e => {
                dispatch(actionCreator(NETWORK_ERR, e))   
                timeout(dispatch)            
            })
        })()
        
    }
}

export const likeUpdate = (postId) => {
    return dispatch => {
        (() => {
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'POST',
            }
            fetch(`${domain}twits/${postId}/likes`,param)
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }else{
                    const resp = res.json()
                    throw new Error('request failed')
                }
            })
            .then(response => dispatch(actionCreator(LIKE_POST, response)))
            .catch(e => {
                dispatch(actionCreator(NETWORK_ERR, e))
                timeout(dispatch)
            })
        })()
    }
}

export const unlikeUpdate = ({userId, postId}) => {
    return dispatch => {
        (() => {
            dispatch(actionCreator(UNLIKE_POST, {userId, postId}))
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'DELETE',
            }
            fetch(`${domain}twits/${postId}/likes`,param)
            .then(res => res.json())
            .then(resp => {
                dispatch(actionCreator(UNLIKE_POST, {userId, postId}))              
            })
            .catch(e => {
                dispatch(actionCreator(NETWORK_ERR, e))
                timeout(dispatch)
            })
        })()
    }
}

export const commentPost = ({postid, comment}) => {
    return dispatch => {
        (() => {
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'POST',
                body: JSON.stringify({postid, comment})
            }
            fetch(`${domain}twits/comments`, param)
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }else{
                    throw new Error('request failed')
                }
            })
            .then(resp => {
                dispatch(actionCreator(COMMENT, resp))
            })
            .catch(e => {
                dispatch(actionCreator(NETWORK_ERR, e))
                timeout(dispatch)
            })
        })()
    }
}

export const newPost = posts => {
    return dispatch => {
        (() => {
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'POST',
                body: JSON.stringify({posts: posts})
            }
            fetch(`${domain}twits`, param)
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }else{
                    const resp = res.json()
                    throw new Error('request failed')
                }
            })
            .then(resp => dispatch(actionCreator(NEW_POST, resp)))
            .catch(e => {
                dispatch(actionCreator(NETWORK_ERR, e))
                timeout(dispatch)
            })
        })()
    }
}

export const allPost = () => {
    return dispatch => {
        (() => {
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'GET',
            }
            dispatch(actionCreator(LOAD_POST, true))
            fetch(`${domain}twits`, param)
            .then(res => {
                if(res.status === 200){
                    return res.json()
                }else{
                    const resp = res.json()
                    throw new Error('request failed')
                }
            })
            .then(resp => {
                dispatch(actionCreator(LOAD_POST, false))
                dispatch(actionCreator(ALL_POST, resp))
            })
            .catch(e => {
                dispatch(actionCreator(LOAD_POST, false))
                dispatch(actionCreator(NETWORK_ERR, e.message))
                timeout(dispatch)
            })
        })()
    }
 }

 export const deletePost = ({userId, postId}) => {
    return dispatch => {
        (() => {
            dispatch(actionCreator(DELETE_POST,{userId, postId}))
            const param = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${cookies.get('twit_token')}`
                },
                method: 'DELETE',
            }
            fetch(`${domain}twits/${postId}`,param)
            .then(res => res.json())
            .then(resp => {            
            })
            .catch(e => {
                dispatch(actionCreator(NETWORK_ERR, e))
                timeout(dispatch)
            })
        })()
    }
}
