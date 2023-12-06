'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function LoginPage() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loginInProgress, setloginInProgress] = useState(false);

  // States to track login success and failure
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');

  // State to track if the success message should be displayed
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Function to display a notification
  const showNotification = (title, body) => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  // Test Case that Authenticates Logins(Daher)
  function handleFormSubmit(e) {
    e.preventDefault();

    // Check if email or password is empty
    if (!email || !password) {
        setLoginError('Please fill in both email and password fields.');
        return; // Exit the function early
      }
  
    setloginInProgress(true);

    setloginInProgress(true);

    axios
  .post(
    'http://localhost:8000/api/users/login',
    {
      email: email,
      password: password,
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )
  .then((response) => {
    console.log(response);
    console.log('Working');
    setLoginSuccess(true);
    setShowSuccessMessage(true);
    setloginInProgress(false);
    showNotification('Login Successful!', 'You have successfully logged in.');
  })
  .catch((error) => {
    console.log(error.response); // Log the entire error response for inspection

    if (error.response && error.response.status === 400) {
      // Unauthorized: Incorrect username or password
      const errorResponse = error.response.data;

      if (errorResponse.error === 'invalid_email') {
        setLoginError('This email is not registered. Please register to create a new account.');
      } else if (errorResponse.error === 'invalid_password') {
        setLoginError('Incorrect password. Please try again.');
      } else {
        setLoginError('Incorrect email or password. Please try again.');
      }
    } else {
      setLoginError('An error occurred during login. Please try again later.');
    }

    setloginInProgress(false);
    showNotification('Login Failed', `Error: ${error.message}`);
  });
  }

  useEffect(() => {
    // Clear the success message after a short delay
    const successTimeoutId = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 4000); // Adjust the duration as needed

    // Clear the error message after a short delay
    const errorTimeoutId = setTimeout(() => {
      setLoginError('');
    }, 5000); // Adjust the duration as needed

    return () => {
      clearTimeout(successTimeoutId);
      clearTimeout(errorTimeoutId);
    };
  }, [showSuccessMessage, loginError]);

  return (
    <section className="mt-8">
      <h1 className="text-center text-title text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto">
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button onClick={handleFormSubmit} type="submit">
          Login
        </button>
      </form>

      {/* Display the success message only when login is successful */}
      {showSuccessMessage && (
        <div className="text-center text-green-500 mt-8">
          <strong>Congratulations!</strong> You are now logged in!
        </div>
      )}

      {/* Display the error message when login fails */}
      {loginError && (
        <div className="text-center text-red-500 mt-8">
          <strong>Login Failed!</strong> {loginError}
        </div>
      )}
    </section>
  );
}



