import { useState } from "react";
import Login from "./Login";
import projectpic from "../assets/create-project.png";
import SignUp from "./SignUp";


export default function LoginPage() {

  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showSignup, setSignup] = useState<boolean>(false);
 
  return (
    <div className="flex md:flex-row min-h-screen overflow-x-hidden md:justify-between justify-center md:mx-32 mx-4 items-center">
      <div className="">
        <img src={projectpic} className="md:w-xl md:block hidden"></img>
      </div>
      {showLogin && <Login signUpPage={(value) => {
        setSignup(value)
        setShowLogin(false)
      }} loginPage={setShowLogin}/>}
      {showSignup && <SignUp loginPage={(value) => {
        setShowLogin(value)
        setSignup(false)
      }} signUpPage={setSignup}/>}
    </div>
  );
}
