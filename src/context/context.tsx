import { useReducer, createContext, Dispatch } from "react";
import { State, Actions } from "./interfaces";
import Reducer from "./reducer";


const initialState: State = {
    activities: [],
    user: {
      email: '',
      password: '',
      birthdate: '',
      name: '',
      lastname: '',
      log: false
    }
}

const DoSomethingContext = createContext<{
    state: State; 
    dispatch: Dispatch<Actions>}>({
        state: initialState, 
        dispatch: ()=> null
    })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DoSomethingProvider: React.FC <any> = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
  
    return (
      <DoSomethingContext.Provider value={{state, dispatch}}>
        {children}
      </DoSomethingContext.Provider>
    )
  }

  export { DoSomethingProvider, DoSomethingContext}