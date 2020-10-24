import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../Shared/utility'

const authStart = ( state) => {
    return updateObject(state , {error : null , loading : true})
}
const authSuccess = ( state , action ) => {
    return updateObject(state , {
        idToken : action.payload.idToken ,
        userId : action.payload.userId ,
        error : null , 
        loading : false
    
    })
}
const authFail = ( state , action ) => {
    return updateObject(state , {
        error : action.payload, 
        loading : false
    })
}
const authlogout = ( state) => {
    return updateObject(state , {
        idToken : null , 
        userId : null ,
    })
}

export const setAuthRedirectPath =(state , action ) =>{
        return updateObject (state , {redirectPath: action.payload})
}

const authReducer = (state, action) => {    
    switch(action.type) {
    case actionType.AUTHENTICATE_START : return authStart(state) 
    case actionType.AUTHENTICATE_FAIL : return authFail(state,action) 
    case actionType.AUTHENTICATE_SUCCESS: return authSuccess(state,action)
    case actionType.AUTHENTICATE_LOGOUT : return authlogout(state)
    case actionType.SET_REDIRECT_PATH : return setAuthRedirectPath(state,action)
    default : return state 
    }
}
export default authReducer;