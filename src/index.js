import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {TodoContextProvider} from './context/Providers/todoProvider';
import {ChartContextProvider} from './context/Providers/chartProvider';
import {AuthContextProvider} from './context/Providers/AuthProvider';


ReactDOM.render(
  <React.StrictMode>
    <TodoContextProvider>
      <ChartContextProvider>
        <AuthContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
        </AuthContextProvider>
     </ChartContextProvider>
    </TodoContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
