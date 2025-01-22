import { useState } from "react";
import SignUpForm from "../components/SignupForm.jsx";
import LoginForm from "../components/LoginForm.jsx";
import '../styles/auth.css'; 

function AuthPage(props) {
  const [signUp, setSignUp] = useState(false); // Initialize to false to show login form first

  function togglePage() {
    setSignUp(!signUp);
  }
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.style.background = "url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGVjb21tZXxlbnwwfHx8fDE2MzY3NjY2NzA&ixlib=rb-1.2.1&q=80&w=1080') no-repeat center center fixed";
    rootElement.style.backgroundSize = "cover";
  }

  
  return (
    <div className="signup-wrapper">
      <div className="signupcontainer">
      {/* <img src="../assets/Frontend_Assets/logo.png" alt="Logo" className="nav-logo" /> */}
        <h1>{signUp ? "" : ""}</h1>
        <>
          {signUp ? (
            <SignUpForm setUser={props.setUser} />
          ) : (
            <LoginForm setUser={props.setUser} />
          )}
        </>
        <p>Or go here to:</p>
        <button onClick={togglePage}>{signUp ? "Log In" : "Register"}</button>
      </div>
    </div>
  );
}

export default AuthPage;