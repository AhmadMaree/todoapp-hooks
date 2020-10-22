import React , {useReducer,createContext} from 'react';
import initaltodoState from './initalStates/Todo';
import todoReducer from './reducers/Todo';


export const GlobalContext = createContext();

export const GlobalContextProvider = props => {

    const [todoState , todoDispatch] = useReducer(todoReducer,initaltodoState);
    

   return (
       <GlobalContext.Provider value ={{todoState,todoDispatch}} >
           {props.children}
       </GlobalContext.Provider>
   )
}