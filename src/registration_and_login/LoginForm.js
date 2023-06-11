import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { isEmail, isLength } from 'validator';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Not loged');

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validator.isEmail(newEmail));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      // Perform validation
  if (!isEmail(email)) {
    setError('Please enter a valid email address.');
    return;
  }

  if (!isLength(password, { min: 6 })) {
    setError('Password should be at least 6 characters long.');
    return;
  }

  // Continue with login process
  // You can make an API call here to authenticate the user

  // Clear form fields and error
  setEmail('');
  setPassword('');
  setError('');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ROOT_VAR}/api/users/login?email=${email}&password=${password}`);
      setStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {(status === 'Login successful') ? (
        'LOGED'
        ) : (
          <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              {!isValidEmail && <p className="error">Invalid email address</p>}
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {error && <p>{error}</p>}
              <button type="submit">Login</button>
            </form>
          </>
        )
      }

      
    </>
  );
};

export default LoginForm;