import React, {useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import {BarChart,CartesianGrid ,XAxis,YAxis,Bar , ResponsiveContainer  , Tooltip, Text} from 'recharts'
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './ChartTodo.module.css';
import axios from '../../axios-ListData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const ChartTodo = props =>  {

     const [todoList,setTodoList] = useState([]);
     const [loading , setLoading] = useState(false);
     const [error,setError] = useState(null);

     useEffect(()=>{
        axios.get('/ListTodo.json')
            .then(response => {
                   const todoData = Object.entries(response.data).reduce((item ,[key,value]) =>{
                       item[value.Date] =  item[value.Date]|| {Date:value.Date,count: 0};
                       item[value.Date].count++;
                       return item;
                   },[])
                   setTodoList(todoData)
                   setLoading(false)
           }).catch(err=>{
                  setError(err)
                  setLoading(false)   
           })  
     },[])


        let chart = <CircularProgress className={classes.Loading} />
        if(!loading) {
            if(error) {
            chart = <p style={{textAlign : 'center',fontSize :30}}>{error.message}</p>
            }else {
            chart = (<ResponsiveContainer width="100%" height={600}>
                            <BarChart
                                    style={{ margin: "0 auto" }}
                                     data={Object.values(todoList)}>
                            <CartesianGrid strokeDasharray="3 3" />
                             <XAxis dataKey="Date" tickSize={5} height={100} interval={0} tick={props => {
                                    return (
                                        <g transform={`translate(${props.x},${props.y})`}>
                                        <Text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{props.payload.value}
                                        </Text>
                                      </g>
                                    );
                             }}/>
                             <YAxis/>
                             <Tooltip />
                             <Bar dataKey="count" fill="#8884d8" />
                           </BarChart>
                        </ResponsiveContainer>    
            )
          }
        }
            return (
                <div className={classes.ChartTodo}>
                    <Paper className={classes.Paper} elevation={2}>
                      <p textAnchor="middle" className={classes.Text} >NO. Of Task</p>
                        {chart}
                    </Paper>
                </div>
                )
}
export default withErrorHandler(ChartTodo , axios );