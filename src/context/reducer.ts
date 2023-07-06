import { State, actions, Activity, Actions, User } from "./interfaces";

export default function Reducer (state: State, action: Actions): State {
    const { type, payload } = action;
    switch (type) {
      case actions.ADD_ACTIVITY:
        return {
          ...state,
          activities: [...state.activities, payload as Activity]
        };
      case actions.DELETE_ACTIVITY:
        return {
          ...state,
          activities: state.activities.filter((activity: Activity)=> (activity.key != (payload as Activity).key && activity.email == payload.email) || activity.email != payload.email)
        };
        case actions.SIGN_IN:
          return {
            ...state,
            user: payload as User
          }
        case actions.SIGN_OUT:
          return {
            ...state,
            user: payload as User
          }
      default:
        return state;
    }
  }