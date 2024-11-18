import axios from 'axios';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmail, isLength } from 'validator';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(isEmail(newEmail));
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

    try {
      setIsLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      console.log('User UID:', uid);
      const token = await userCredential.user.getIdToken();
      console.log('User ID Token:', token);

      console.log(userCredential.operationType);
      const response = await axios.post(
        `${process.env.REACT_APP_API_ROOT_VAR}/api/users/login?email=${email}&password=${password}`,
      );
      if (response.data === 'Login successful') {
        setIsLoading(false);
        navigate('/votings');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
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
      {isLoading && <h1>loading</h1>}
    </>
  );
};

export default LoginForm;
