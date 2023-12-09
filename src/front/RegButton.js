import React, { useState } from "react";
import RegistrationForm from "../registration_and_login/RegistrationForm";
import LoginForm from "../registration_and_login/LoginForm";


function RegButton() {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLoginComponent, setShowLoginComponent] = useState(false);
  
    const handleRegisterClick = () => {
      setShowRegistration(true);
    };
  
    const handleLoginComponentClick = () => {
      setShowLoginComponent(true);
    };
  
    return (
      <div>
        {showRegistration ? (
          <RegistrationForm />
        ) : showLoginComponent ? (
          <LoginForm />
        ) : (
          <>
            <button onClick={handleRegisterClick}>Register</button>
            <br/>
            <button onClick={handleLoginComponentClick}>Login</button>
          </>
        )}
        
      </div>
    );
  }

export default RegButton;