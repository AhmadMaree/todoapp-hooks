import * as actionType from '../actionTypes';
import axios from 'axios';


export  const authSucces = (idToken,userId) => (dispatch) => {
    dispatch({
        type: actionType.AUTHENTICATE_SUCCESS , 
        payload :{
            userId : userId ,
            idToken : idToken,
        }
    })

}
export  const authFail = (error) => (dispatch) => {
    dispatch({
        type : actionType.AUTHENTICATE_FAIL,
        payload : error.response.data.error
    })
}
export  const authStart = () =>(dispatch) => {
    dispatch({
        type : actionType.AUTHENTICATE_START    ,
    })
}

export const checkAuth = (expirationTime) => (dispatch) => {
        setTimeout (()=> {
            logOut()(dispatch)
        },expirationTime *1000)
}

export const logOut = () => (dispatch) => {
    localStorage.removeItem("idToken");
    localStorage.removeItem("idUser");
    localStorage.removeItem("expTime");
    dispatch({
        type : actionType.AUTHENTICATE_LOGOUT
    })
}



export default  (email , password , isSignup) => (dispatch) => {
        authStart()(dispatch);
        const authData = {
            email : email ,
            password : password,
            returnSecureToken : true,
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBSB7vm0gJkbK63YIl6kLZg6rpv4nVaM7g";
        if(!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSB7vm0gJkbK63YIl6kLZg6rpv4nVaM7g"
        }
        axios.post(url,authData)
             .then(response => {
                    localStorage.setItem("idToken", response.data.idToken);
                    localStorage.setItem("idUser", response.data.localId);
                    localStorage.setItem("expTime", new Date(new Date().getTime()+response.data.expiresIn*1000));
                    authSucces(response.data.idToken , response.data.localId)(dispatch)
                    checkAuth(response.data.expiresIn)(dispatch)
             }).catch(err => {
                authFail(err)(dispatch)
             })
}