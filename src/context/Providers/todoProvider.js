import React , {useReducer,createContext} from 'react';
import initaltodoState from '../initalStates/Todo';
import todoReducer from '../reducers/Todo';

export const todoContext = createContext();

export const TodoContextProvider = props => {
    const [state, dispatch] = useReducer(todoReducer, initaltodoState);

    return (
      <todoContext.Provider value={[state, dispatch]}>
        {props.children}
      </todoContext.Provider>
    );
}