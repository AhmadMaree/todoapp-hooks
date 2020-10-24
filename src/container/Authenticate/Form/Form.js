import React from 'react'
import { Button, TextField } from '@material-ui/core'
import classes from './Form.module.css';


const form = (props) => {
    
    const change = (name , value) => {
        value.persist();
        props.handleChange(value);
        props.setFieldTouched(name, true, false);
    }
    return (
 <form  onSubmit={props.handleSubmit} className={classes.Form} >
    <TextField  
       id="email"
       name="email"
       helperText={props.touched.email ? props.errors.email : ""}
       error={props.touched.email && Boolean(props.errors.email)}
       label="Email"
       fullWidth
       value={props.values.email}
       onChange={change.bind(null,"email")}
     />
    <TextField
       id="password"
       name="password"
       helperText={props.touched.password ? props.errors.password : ""}
       error={props.touched.password && Boolean(props.errors.password)}
       label="Password"
       fullWidth
       type="password"
       value={props.password}
       onChange={change.bind(null,"password")}
     />
     <div style={{padding :'20px'}}>
       <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={!props.isValid}
      >
          Login
      </Button>
      </div>
    </form>
    );
}
export default form;