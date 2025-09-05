import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "./Redux/Reducers/rootReducer";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
   const token = useSelector((state : RootState)=> state.auth.token)
   const tokenFromLocalStorage = localStorage.getItem('token')
  // If no token in redux OR localStorage → redirect to login
  if ( !token && !tokenFromLocalStorage) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
