import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsValidPassword(validatePassword(newPassword));
  };

  const validatePassword = (password) => {
    // Custom password validation rules
    // Example: At least 8 characters and contain a lowercase letter, an uppercase letter, and a number
    return (
      validator.isLength(password, { min: 8 }) &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password)
    );
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(validator.isEmail(newEmail));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValidEmail) {
      // Perform further actions or submit the form
      console.log('Valid email:', email);
    } else {
      console.log('Invalid email:', email);
    }

    if (isValidPassword) {
      // Perform further actions or submit the form
      console.log('Valid password:', password);
    } else {
      console.log('Invalid password:', password);
    }
    

    try {
      console.log(process.env.REACT_APP_API_ROOT_VAR);
      const response = await axios.post(`${process.env.REACT_APP_API_ROOT_VAR}/api/users`, { email, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Registration</h1>
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
          onChange={handlePasswordChange}
        />
        {!isValidPassword && (
          <p className="error">
            Password must be at least 8 characters and contain a lowercase letter, an uppercase letter, and a number
          </p>
        )}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegistrationForm;