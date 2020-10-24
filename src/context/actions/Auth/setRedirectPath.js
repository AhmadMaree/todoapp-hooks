import * as actionType from '../actionTypes';

export default (path) => (dispatch) => {
    
    dispatch({
        type : actionType.SET_REDIRECT_PATH , 
        payload : path ,
    })
}
