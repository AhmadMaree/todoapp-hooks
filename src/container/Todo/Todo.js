import React, {useEffect, useState ,useContext } from 'react' ;
import {TextField  , Button , List} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

import classes from './Todo.module.css';
import axios from '../../axios-ListData';
import ListTodo from './ListTodo/ListTodo'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {todoContext} from '../../context/Providers/todoProvider';
import {authContext} from '../../context/Providers/AuthProvider';
import * as actiontype from '../../context/actions/actionTypes';
import * as routsPath from '../../Shared/Constants/constantRouter';

const Todo = props =>  {

    const [state,dispatch] = useContext(todoContext);
    const [stateAuth] = useContext(authContext)
    const [error,setError] = useState(false) ; 
    const [value , setValue] = useState('');
   
    useEffect(() => {
      const quaryParams ='?auth='+stateAuth.idToken+'&orderBy="userId"&equalTo="' + stateAuth.userId + '"';
      axios.get('/ListTodo.json'+quaryParams)
      .then(response => {    
        let todoData = Object.keys(response.data).map(item => {
          return {...response.data[item]  ,id : item}  })
          .filter(item => item.Date === new Date().toDateString())
          dispatch({
            type : actiontype.FETCH_TODO_SUCCESS ,
            payload : todoData,
          })
      }).catch(err => {
        dispatch({
           type : actiontype.MESSAGE_TODO_FAILER,
           payload : err
         })
      })
    },[dispatch,stateAuth.idToken,stateAuth.userId])
     
    const handleChange = (event) => {
      setError(false);
      setValue(event.target.value)
    }
    const onAddTodoHandler = (event , inputValue) => {
      event.preventDefault();
      if(inputValue.trim() === ''){
        setError(true)
      }else{
        const todoData = {
          name : inputValue.trim() ,
          Date : new Date().toDateString(),
          checked : false ,
          userId : stateAuth.userId
        }
        axios.post("/ListTodo.json" , todoData)
            .then(response => {
              dispatch({
                type : actiontype.ADD_TODO_SUCCESS ,
                payload : {
                  id : response.data.name ,
                  todoData: todoData,
                }
              })
              setValue('')
              setError(false)
            }).catch(err => {
              dispatch({
                type : actiontype.MESSAGE_TODO_FAILER ,
                payload : err
              })
            })
      }
    }

    const onRemoveTodo = (index) => {
      axios.delete(`/ListTodo/${index}.json`)
        .then(res => {
          dispatch({
              type : actiontype.REMOVE_TODO_SUCCESS,
              payload : index
            })
        }).catch(err=>{
          dispatch({
            type : actiontype.MESSAGE_TODO_FAILER ,
            payload : err
          })
        })
    }


    const onCheckBtnHandler = (item) => {
      const updateChecked = {
        ...item,
        checked : !item.checked
      }
          axios.put(`/ListTodo/${item.id}.json`,updateChecked)
          .then(res => {
            dispatch({
              type : actiontype.CHECKED_TODO_SUCCESS,
              payload : {
                itemData : res.data ,
                index : item.id
              }
            })
          }).catch(err => {
            dispatch({
              type : actiontype.MESSAGE_TODO_FAILER ,
              payload : err
            })
          })
    }
      let redirectWhenFails= null
      if(state.error) {
        redirectWhenFails= <Redirect to = {routsPath.ROOT_PATH}  />
      }
      let todoListData = (
          <p style={{alignItems:'center',color:'#6200EE'}}>Let's Add SOME TO-DO</p>
      )
      if(state.todoList != null) {
        todoListData = (
            <List className={classes.List}>
                        {state.todoList.map((itemTodo) => (

                              <ListTodo key ={itemTodo.id} 
                                        checked={itemTodo.checked}
                                        todoText={itemTodo.name}
                                        clickToRemove={()=> onRemoveTodo(itemTodo.id)}
                                        checkBtn ={()=> onCheckBtnHandler(itemTodo)}/>
                        ))}
            </List> 
           )
      }
      return(  
          <div className={classes.Todo}>
                {redirectWhenFails}
                <form className={classes.form}  noValidate autoComplete="off"  onSubmit={(event) => onAddTodoHandler(event,value)}>
                <TextField 
                        className={classes.TextField}
                        id="outlined-full-width"
                        label="Todo"
                        fullWidth
                        rowsMax={4}
                        size ="medium"
                        error={error}
                        helperText={error ?"Must fill the contant":""}
                        value={value}
                        onChange={handleChange}
                      />
                  <Button
                      type="submit"
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      size="large"
                   >
                    ADD
                  </Button>
                </form>
                {todoListData}
          </div>
     
       );     
}
export default withErrorHandler(Todo,axios);