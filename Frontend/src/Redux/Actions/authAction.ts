// Action Types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// Serializable User Type
export interface SafeUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
}

// Action Interfaces
export interface LoginActionType {
  type: typeof LOGIN;
  payload: SafeUser;
}

export interface LogoutActionType {
  type: typeof LOGOUT;
}

export type AuthActionType = LoginActionType | LogoutActionType;

// Action Creators

//  Only store serializable user fields

export const login = (user: SafeUser): LoginActionType => ({
  type: LOGIN,
  payload: user,
});

export const logout = (): LogoutActionType => ({
  type: LOGOUT,
});
