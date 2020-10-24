import React , {useReducer,createContext} from 'react';
import initalAuthState from '../initalStates/Auth';
import AuthReducer from '../reducers/Auth';

export const authContext = createContext();

export const AuthContextProvider = props => {

    const [state, dispatch] = useReducer(AuthReducer, initalAuthState);

  return (
    <authContext.Provider value={[state, dispatch]}>
      {props.children}
    </authContext.Provider>
  );
}