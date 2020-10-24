import React , {useReducer,createContext} from 'react';
import initalChartState from '../initalStates/ChartTodo';
import chartReducer from '../reducers/ChartTodo';

export const chartContext = createContext();

export const ChartContextProvider = props => {

    const [state, dispatch] = useReducer(chartReducer, initalChartState);

  return (
    <chartContext.Provider value={[state, dispatch]}>
      {props.children}
    </chartContext.Provider>
  );
}