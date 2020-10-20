import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

import classes from './ListTodo.module.css'

const listTodo = (props) => {
        return (
                <ListItem  key ={props.Key} role={undefined} dense button className ={classes.ListItem}>
                    <ListItemIcon className={classes.ListItemIcon} onClick={props.checkBtn}>
                             <Checkbox 
                                 edge="start"
                                 checked={props.checked}
                                 tabIndex={-1}
                                 disableRipple
                                 color = "primary"
                                 inputProps={{ 'aria-labelledby': props.Key}}       
                             />
                    </ListItemIcon>
                    <ListItemText id={props.Key} primary={props.todoText} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={props.clickToRemove} >
                                    <DeleteIcon  />
                                </IconButton>
                            </ListItemSecondaryAction>
            </ListItem>
        )
}
export default listTodo;