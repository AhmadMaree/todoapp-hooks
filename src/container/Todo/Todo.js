import React, {useEffect, useState } from 'react' ;
import {TextField  , Button , List} from '@material-ui/core'


import classes from './Todo.module.css';
import axios from '../../axios-ListData';
import ListTodo from './ListTodo/ListTodo'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {updateObject} from '../../Shared/utility'

const Todo = props =>  {

   const [todoList , setTodoList] = useState([]);
   const [error,setError] = useState(false) ; 
   const [value , setValue] = useState('');
   
    useEffect(() => {
      axios.get('/ListTodo.json')
      .then(response => {    
        let todoData = Object.keys(response.data).map(item => {
          return {...response.data[item]  ,id : item}  })
          .filter(item => item.Date === new Date().toDateString())
          setTodoList(todoData)
      }).catch(err => {
         //message error will handle later.
      })
    },[])
     
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
              const updateData= updateObject(todoData,{id:response.data.name});
              setTodoList(todoList.concat(updateData));
              setValue('')
              setError(false)
            }).catch(err => {
              console.log(err)
            })
      }
    }

    const onRemoveTodo = (index) => {
      axios.delete(`/ListTodo/${index}.json`)
        .then(res => {
            setTodoList(todoList.filter(item => index !== item.id));
        }).catch(err=>{
           // console.log(err)
        })
    }


    const onCheckBtnHandler = (item) => {
      const updateChecked = {
        ...item,
        checked : !item.checked
      }
          axios.put(`/ListTodo/${item.id}.json`,updateChecked)
          .then(res => {
            const updateList = todoList.map(element => (element.id === item.id ? {...res.data,element} : element ))
            setTodoList(updateList)
          }).catch(err => {
           //
          })
    }

      let todoListData = (
          <p style={{alignItems:'center',color:'#6200EE'}}>Let's Add SOME TO-DO</p>
      )
      if(todoList != null) {
        todoListData = (
            <List className={classes.List}>
                        {todoList.map((itemTodo) => (

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