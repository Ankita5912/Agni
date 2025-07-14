// Action Types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// Serializable User Type
export interface SafeUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
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

// ✅ Only store serializable user fields
import type { User } from "firebase/auth";

export const login = (user: User): LoginActionType => ({
  type: LOGIN,
  payload: {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
  },
});

export const logout = (): LogoutActionType => ({
  type: LOGOUT,
});
