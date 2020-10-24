import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../Shared/utility'



const chartStart = (state) => {
    return updateObject(state,{ loading : true })
 }
 const chartSucess = (state,action) => {
     return updateObject(state,{todoList:action.payload, loading : false})
 }
 const chartFail = (state,action) => {
     return updateObject(state,{loading : false , error : action.payload})
 }
 const chartTodoReducer = (state , action) => {
     switch(action.type) {
         case actionType.CHART_START : return chartStart(state)
         case actionType.CHART_FETCH_DATA_SUCCESS : return chartSucess(state,action)
         case actionType.CHART_FETCH_DATA_FAILER : return chartFail(state,action)
         default :
                 return state;
     }
 }
 export default chartTodoReducer;