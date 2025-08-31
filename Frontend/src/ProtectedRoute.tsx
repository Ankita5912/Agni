import { useDispatch } from "react-redux";
import type { AppDispatch } from "./Redux/store";
import { useEffect } from "react";
import { login } from "./Redux/Actions/authAction";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  // Sync token to redux store on mount
  useEffect(() => {
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch, token]);

  // If no token in redux OR localStorage → redirect to login
  if ( !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
