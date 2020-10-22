import React from 'react';
import { Route , Switch  } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Todo from './container/Todo/Todo';
import ChartTodo from './container/ChartTodo/ChartTodo';
import * as routersPath from './Shared/Constants/constantRouter';

const App = () =>  {
  return (
          <Layout>
             <Switch>
              <Route path={routersPath.CHARTS_PATH} component={ChartTodo} />
              <Route path={routersPath.ROOT_PATH} exact component ={Todo}/>
              </Switch>
          </Layout>
  );
}

export default App;
