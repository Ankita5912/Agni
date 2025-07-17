import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Frontend/firebase";
import { useDispatch } from "react-redux";
import { login, logout } from "./src/Redux/Actions/authAction";
import type { AppDispatch } from "./src/Redux/store";

export const FirebaseListener = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
        console.log("Logged in:", user.displayName);
      } else {
        dispatch(logout());
        console.log("Logged out");
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};
