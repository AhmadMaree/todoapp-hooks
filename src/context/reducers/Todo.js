import * as actionType from '../actions/actionTypes';
import {updateObject} from '../../Shared/utility'


const addTodoSucess = (state,action) => {
    const updateData= updateObject(action.payload.todoData,{id:action.payload.id});
    return updateObject(state,{ todoList:state.todoList.concat(updateData)})
 }
 const fetchTodoSuccsse = (state,action) => {
     return updateObject(state,{
        todoList: action.payload
     })
 }
 const removeTodoSuccsse = (state,action) => {
     return updateObject(state,{
        todoList: state.todoList.filter(item => action.payload !== item.id)
     })
 }
 const checkedTodoSuccsse = (state,action) => {
    const updateList = state.todoList.map(item => (item.id === action.payload.index ? {...action.payload.itemData,item} : item ))
     return updateObject(state,{todoList: updateList})
 }
 const errorMessage = (state, action) => {
     return updateObject(state,{error:action.payload})
 }
 const todoReducer = (state , action) => {
     switch(action.type) {
         case actionType.ADD_TODO_SUCCESS : return addTodoSucess(state,action)
         case actionType.FETCH_TODO_SUCCESS : return fetchTodoSuccsse(state,action)
         case actionType.REMOVE_TODO_SUCCESS : return removeTodoSuccsse(state,action)
         case actionType.CHECKED_TODO_SUCCESS : return checkedTodoSuccsse(state,action)
         case actionType.MESSAGE_TODO_FAILER : return   errorMessage(state,action)
         default :
                 return state;
     }
 }
 export default todoReducer;