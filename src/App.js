import React, { useContext, useEffect } from 'react';
import { Route , Switch ,Redirect } from 'react-router-dom';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { CircularProgress } from '@material-ui/core';

import * as routersPath from './Shared/Constants/constantRouter';
import onAuthSuccess from './context/actions/Auth/checkAuthSuccess';
import {authContext} from './context/Providers/AuthProvider';
import Logout from './container/Authenticate/Logout/Logout';


const asyncAuth = React.lazy(() =>
  import ('./container/Authenticate/Auth')
);
const asyncTodo = React.lazy(() =>
  import ('./container/Todo/Todo')
);
const asyncChartTodo = React.lazy(() => 
  import ('./container/ChartTodo/ChartTodo')
);

const App = () =>  {

  const [state,dispatch] = useContext(authContext);

  useEffect(() => {
      onAuthSuccess()(dispatch);
  },[dispatch])

  let routes = (
    <Switch>
        <Route path={routersPath.AUTHENTICAT_PATH} exact component={asyncAuth}/>
        <Redirect to={routersPath.AUTHENTICAT_PATH} />
    </Switch>
  );

  if(state.idToken !== null) {
    routes = (
      <Switch>
      <Route path={routersPath.CHARTS_PATH} component={asyncChartTodo}/>
      <Route path={routersPath.LOGOUT_PATH} component={Logout}/>
      <Route path={routersPath.ROOT_PATH} exact component={asyncTodo}/>
      <Redirect to={routersPath.ROOT_PATH} />
      </Switch>
     )
  }

  return (
          
              <React.Suspense fallback={<CircularProgress />} >
                <Layout>
                  {routes}
                </Layout>
            </React.Suspense>
  );
}

export default App;
