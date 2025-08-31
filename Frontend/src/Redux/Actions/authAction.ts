// Action Types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";


// Action Interfaces
export interface LoginActionType {
  type: typeof LOGIN;
  payload: string | null;
}

export interface LogoutActionType {
  type: typeof LOGOUT;
}

export type AuthActionType = LoginActionType | LogoutActionType;

// Action Creators

//  Only store serializable user fields

export const login = (token: string | null): LoginActionType => ({
  type: LOGIN,
  payload: token,
});

export const logout = (): LogoutActionType => ({
  type: LOGOUT,
});
