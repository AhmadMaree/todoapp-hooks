import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import Todo from './container/Todo/Todo';
import * as routersPath from './Shared/Constants/constantRouter';

const App = props =>  {
  return (
          <Layout>
              <Route path={routersPath.ROOT_PATH}  component ={Todo}/>
              <Route path={routersPath.CHARTS_PATH} render={()=> <p>Whatever !! will change</p>} />
          </Layout>
  );
}

export default App;
