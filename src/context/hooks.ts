import { useContext } from 'react'
import { DoSomethingContext } from "./context";

export function useActivity() {
    const {state, dispatch} = useContext(DoSomethingContext)
    return {activities: state.activities, activityDispatch: dispatch}
   }

export function useUser()  {
    const {state, dispatch} = useContext(DoSomethingContext)
    return {user: state.user, userDispatch: dispatch}
  }

