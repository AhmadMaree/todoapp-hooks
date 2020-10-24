import React, {useEffect,useContext } from 'react';
import { Paper ,Typography } from '@material-ui/core';
import {BarChart,CartesianGrid ,XAxis,YAxis,Bar , ResponsiveContainer  , Tooltip, Text} from 'recharts'
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './ChartTodo.module.css';
import axios from '../../axios-ListData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {chartContext} from '../../context/Providers/chartProvider';
import {authContext} from '../../context/Providers/AuthProvider';
import * as typeaction from '../../context/actions/actionTypes';
const ChartTodo = () =>  {

     const [state,dispatch] = useContext(chartContext)
     const [stateAuth] = useContext(authContext)
     useEffect(()=>{
        dispatch({
             type:typeaction.CHART_START,
         })
         const quaryParams = '?auth='+stateAuth.idToken+'&orderBy="userId"&equalTo="' + stateAuth.userId + '"';
        axios.get('/ListTodo.json'+quaryParams)
            .then(response => {
                   const todoData = Object.entries(response.data).reduce((item ,[key,value]) =>{
                       item[value.Date] =  item[value.Date]|| {Date:value.Date,count: 0};
                       item[value.Date].count++;
                       return item;
                   },[])
                   dispatch({
                      type : typeaction.CHART_FETCH_DATA_SUCCESS,
                      payload: todoData
                  })
           }).catch(err=>{
            dispatch({
                        type : typeaction.CHART_FETCH_DATA_FAILER,
                        payload: err
                    })  
           })  
     },[dispatch,stateAuth.idToken,stateAuth.userId])


        let chart = <CircularProgress className={classes.Loading} />
        if(!state.loading) {
            if(state.error) {
            chart = <Typography className={classes.error}>{state.error.message}</Typography>
            }else {
            chart = (<ResponsiveContainer width="100%" height={600}>
                            <BarChart
                                    style={{ margin: "0 auto" }}
                                     data={Object.values(state.todoList)}>
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