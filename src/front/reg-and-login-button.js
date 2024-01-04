import React from 'react'
import { Link } from 'react-router-dom'

function RegAndLoginButton () {
  return (
    <div>
      <>
        <Link to="/registration">Registration</Link>
        <br />
        <Link to="/login">Login</Link>
      </>
    </div>
  )
}

export default RegAndLoginButton
