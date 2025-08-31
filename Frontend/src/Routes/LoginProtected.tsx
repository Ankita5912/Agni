import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader";
import type { JSX } from "react/jsx-runtime";
import type { RootState } from "../Redux/Reducers/rootReducer";

export default function LoginProtected({
  children,
}: {
  children: JSX.Element;
}) {
  const user = useSelector((state: RootState) => state.user.user);

  if (user === null) return <Navigate to="/login" replace />;
  if (user === undefined) return <Loader />; // only if your reducer might return undefined

  return children;
}
