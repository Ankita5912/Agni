import type { AuthActionType } from "../Actions/authAction";
import { LOGIN, LOGOUT } from "../Actions/authAction";

interface stateType{
  token: string | null;
}

const token = localStorage.getItem('token')

const initialState: stateType = {
  token : null,
}

export const authReducer = (state: stateType = initialState, action: AuthActionType): stateType => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: token }
    case LOGOUT:
      return { ...state, token: null }
    default:
      return state;
  }
};