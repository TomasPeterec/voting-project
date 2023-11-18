import React, { useState } from "react";
import { Link } from "react-router-dom";


function RegButton() {

    return (
      <div>
          <>
            <Link to="/registration">Registration</Link>
            <br/>
            <Link to="/login">Login</Link>
          </>
      </div>
    );
  }

export default RegButton;