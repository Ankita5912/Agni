import type { AuthActionType, SafeUser } from "../Actions/authAction";
import { LOGIN, LOGOUT } from "../Actions/authAction";

interface stateType{
  user: SafeUser | null;
}

const initialState: stateType = {
  user : null,
}

export const authReducer = (state: stateType = initialState, action: AuthActionType): stateType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload }
    case LOGOUT:
      return { ...state, user: null }
    default:
      return state;
  }
};