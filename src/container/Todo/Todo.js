import React, {useEffect, useState ,useContext } from 'react' ;
import {TextField  , Button , List} from '@material-ui/core'
import {Redirect} from 'react-router-dom'

import classes from './Todo.module.css';
import axios from '../../axios-ListData';
import ListTodo from './ListTodo/ListTodo'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {GlobalContext} from '../../context/Provider';
import * as actiontype from '../../context/actions/actionTypes';
import * as routsPath from '../../Shared/Constants/constantRouter';

const Todo = props =>  {

   const {todoState,todoDispatch} = useContext(GlobalContext);
    // const [todoList , setTodoList] = useState([]);
    const [error,setError] = useState(false) ; 
    const [value , setValue] = useState('');
   
    useEffect(() => {
      axios.get('/ListTodo.json')
      .then(response => {    
        let todoData = Object.keys(response.data).map(item => {
          return {...response.data[item]  ,id : item}  })
          .filter(item => item.Date === new Date().toDateString())
          todoDispatch({
            type : actiontype.FETCH_TODO_SUCCESS ,
            payload : todoData,
          })
      }).catch(err => {
         todoDispatch({
           type : actiontype.MESSAGE_TODO_FAILER,
           payload : err
         })
      })
    },[todoDispatch])
     
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
        }
        axios.post("/ListTodo.json" , todoData)
            .then(response => {
              todoDispatch({
                type : actiontype.ADD_TODO_SUCCESS ,
                payload : {
                  id : response.data.name ,
                  todoData: todoData,
                }
              })
              setValue('')
              setError(false)
            }).catch(err => {
              todoDispatch({
                type : actiontype.MESSAGE_TODO_FAILER ,
                payload : err
              })
            })
      }
    }

    const onRemoveTodo = (index) => {
      axios.delete(`/ListTodo/${index}.json`)
        .then(res => {
            todoDispatch({
              type : actiontype.REMOVE_TODO_SUCCESS,
              payload : index
            })
        }).catch(err=>{
          todoDispatch({
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
            todoDispatch({
              type : actiontype.CHECKED_TODO_SUCCESS,
              payload : {
                itemData : res.data ,
                index : item.id
              }
            })
          }).catch(err => {
            todoDispatch({
              type : actiontype.MESSAGE_TODO_FAILER ,
              payload : err
            })
          })
    }
      let redirectWhenFails= null
      if(todoState.error) {
        redirectWhenFails= <Redirect to = {routsPath.ROOT_PATH}  />
      }
      let todoListData = (
          <p style={{alignItems:'center',color:'#6200EE'}}>Let's Add SOME TO-DO</p>
      )
      if(todoState.todoList != null) {
        todoListData = (
            <List className={classes.List}>
                        {todoState.todoList.map((itemTodo) => (

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