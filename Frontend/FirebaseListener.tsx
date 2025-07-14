import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Frontend/firebase";
import { useDispatch } from "react-redux";
import { login, logout } from './src/Redux/Actions/authAction'
import type { AppDispatch } from "./src/Redux/store";

export const FirebaseListener = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(login(user));
      else dispatch(logout());
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
