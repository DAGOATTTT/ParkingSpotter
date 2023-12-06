'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import axios from 'axios'

import {CookiesProvider, useCookies} from "react-cookie";
function LoginPage({ user }){
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [loginInProgress, setloginInProgress] = useState(false);
const [cookies, setCookie] = useCookies(["user"]);
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
    

//Test Case that Authenticates Logins(Daher)
async function handleFormSubmit(event){
    setCookie("user", user, { path: "/" });
    setCookie("user", email, { path: "/" });
    event.preventDefault();
    if (!email || !password) {
        setLoginError('Please fill in both email and password fields.');
        return; // Exit the function early
      }
    setloginInProgress(true);
    try {
            const response = await axios.post("http://localhost:8000/api/users/login", {
            email: email,
            password: password,
        });
        
        setloginInProgress(false);
        console.log(response);
        console.log('Working');
        setLoginSuccess(true);
        setShowSuccessMessage(true);
        setloginInProgress(false);
        showNotification('Login Successful!', 'You have successfully logged in.');
    } catch (error) {
        console.log(error.response);
        if (error.response && error.response.status === 400) {
          // Unauthorized: Incorrect username or password
          setLoginError('Incorrect email or password. Please try again.');
          //setLoginError('An error occurred during login. Please try again later.');
        }
        setloginInProgress(false);
        showNotification('Login Failed', `Error: ${error.message}`);
      }
    }
    useEffect(() => {
        // Clear the success message after a short delay
        const successTimeoutId = setTimeout(() => {
          setShowSuccessMessage(false);
        }, 4000); // Adjust the duration as needed
    
        // Clear the error message after a short delay
        const errorTimeoutId = setTimeout(() => {
          setLoginError('');
        }, 4000); // Adjust the duration as needed
    
        return () => {
          clearTimeout(successTimeoutId);
          clearTimeout(errorTimeoutId);
        };
      }, [showSuccessMessage, loginError]);
    return(
        <section class="mt-8">
        <h1 class="text-center text-title text-4xl mb-4">
            Login
        </h1>
        <form class="max-w-xs mx-auto" onSubmit = {handleFormSubmit}>
            <input type="email" placeholder="email"
            onChange={e => setemail(e.target.value)}/>
            <input type="password" placeholder="password"
            onChange={e => setpassword(e.target.value)}/>
            <button onClick={handleFormSubmit}type="submit">Login</button>
            <div class="my-4 text-center text-gray-500">
                Or login with provider
            </div>
            <button class="flex gap-4 justify-center items-center">
            <Image src={"/google.png"} alt={"google logo"} width={32} height={32}/>
                Login with Google
                </button>

        </form>
        {/* Display the success message only when login is successful */}
      {showSuccessMessage && (
        <div className="text-center text-green-500 mt-4">
          <strong>Congratulations!</strong> You can now make reports!
        </div>
      )}

      {/* Display the error message when login fails */}
      {loginError && (
        <div className="text-center text-red-500 mt-4">
          <strong>Login Failed!</strong> {loginError}
        </div>
      )}
        </section>
    );
}

export default LoginPage;
