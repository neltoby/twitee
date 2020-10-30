import produce from 'immer'
import { 
    LOGGEDIN, 
    LOGGEDOUT, 
    USER_DETAILS, 
    ALL_POST, 
    LIKE_POST,
    UNLIKE_POST,
    COMMENT,
    NETWORK_ERR,
    NEW_POST,
    LOAD_POST,
    DELETE_POST
} from '../actions'

export const reducer = (state, action) => {
    console.log(action.type)
    switch(action.type){        
        case LOGGEDIN: {
            return produce(state, draft => {
                draft.LoggedIn = LOGGEDIN
            })
        }
        case LOGGEDOUT: {
            return produce(state, draft => {
                draft.LOGGEDOUT = LOGGEDOUT
            })
        }
        case USER_DETAILS: {
            return produce(state, draft => {
                draft.User = action.payload
            })
        }
        case LOAD_POST: {
            return produce(state, draft => {
                draft.loadingPost = action.payload
            })
        }
        case ALL_POST: {
            return produce(state, draft => {
                draft.Post = action.payload
            })
        }
        case NEW_POST: {
            return produce(state, draft => {
                const newPosts = state.Post.slice()
                draft.Post = [action.payload,...newPosts]
            })
        }
        case LIKE_POST: {
            return produce(state, draft => {
                const { UserId, PostId } = action.payload
                console.log(action.payload)
                draft.Post = state.Post.map((item, i) => {
                    if(item.id === PostId){
                        const copyObj = JSON.parse(JSON.stringify(item))
                        const likes = [...item.Likes, action.payload]
                        copyObj.Likes = likes
                        return copyObj
                    }else{
                        return item
                    }
                })
            })
        }
        case UNLIKE_POST: {
            return produce(state, draft => {
                const { userId, postId } = action.payload
                draft.Post = state.Post.map( item => {
                    if(item.id === postId){
                        const copyObj = JSON.parse(JSON.stringify(item))
                        const likes = copyObj.Likes.filter(obj => obj.UserId !== userId)
                        copyObj.Likes = likes
                        console.log(copyObj)
                        return copyObj
                    }else{ 
                        return item
                    }
                })
            })
        }
        case DELETE_POST: {
            return produce(state, draft => {
                const { userId, postId } = action.payload
                const newArr = state.Post.slice().filter(item => item.id !== postId)
                // state.Post.slice().forEach(item => {
                //     if(item.id !== postId){
                //         newArr.push(item)
                //     }
                // })
                console.log(newArr)
                draft.Post = newArr
            })
        }
        case COMMENT: {
            return produce(state, draft => {
                const { PostId } = action.payload
                draft.Post = state.Post.map(item => {
                    if(item.id === PostId){
                        const copyObj = JSON.parse(JSON.stringify(item))
                        const comment = [action.payload,...copyObj.Comments]
                        copyObj.Comments = comment 
                        console.log(copyObj)
                        return copyObj
                    }else{
                        return item
                    }
                })
            })
        }
        case NETWORK_ERR: {
            return produce(state, draft => {
                draft.network = action.payload
            })
        }
        default: 
        return state
    }
}
