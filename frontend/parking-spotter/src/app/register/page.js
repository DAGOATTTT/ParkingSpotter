"use client"
import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Registerpage() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [creatingUser, setcreatingUser] = useState(false);
  const [userCreated, setusercreated] = useState(false);
  const [error, seterror] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);

  function validateEmail(email) {
    // Simple email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasAtAndDotCom = /@.*\.com$/;
    return hasAtAndDotCom.test(email);
  }

  function handleEmailInputChange(e) {
    // Check if the current input value has '@' and '.com'
    const isEmailFormatValid = validateEmail(e.target.value);
    setEmailFormatError(!isEmailFormatValid);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // Check if email or password is blank
    if (!email || !password) {
      setEmptyFieldsError(true);
      return;
    } else {
      setEmptyFieldsError(false);
    }

    // Check if the email is in a valid format
    const isEmailFormatValid = validateEmail(email);
    setEmailFormatError(!isEmailFormatValid);

    if (!isEmailFormatValid) {
      return; // Do not proceed with form submission if email format is invalid
    }

    setcreatingUser(true);

    // Reset the userCreated, error states
    setusercreated(false);
    seterror(false);

    axios
      .post(
        "http://localhost:8000/api/users",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        console.log(response);
        // Set userCreated to true on successful response
        setusercreated(true);
      })
      .catch((error) => {
        console.log(error.message);
        // Set error to true on error response
        seterror(true);
      })
      .finally(() => {
        // Set creatingUser to false regardless of success or error
        setcreatingUser(false);
      });
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-title text-4xl mb-4">Register</h1>

      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => {
            setemail(e.target.value);
            handleEmailInputChange(e);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          {/* Show "Register" or "Creating User..." based on the loading state */}
          {creatingUser ? 'Creating User...' : 'Register'}
        </button>

        {emptyFieldsError && (
          <div className="my-4 text-center text-red-500 text-bold">
            <strong>Email and password cannot be blank.</strong>
          </div>
        )}

        {emailFormatError && (
          <div className="my-4 text-center text-red-500 text-bold">
            <strong>Please enter a valid email address.</strong>
          </div>
        )}

        {userCreated && (
          <div className="my-4 text-center">
            User Created.<br />
            Now you can{' '}
            <Link className="underline" href={'/login'}>
              Login
            </Link>
          </div>
        )}
        {error && (
          <div className="my-4 text-center text-red-500 text-bold">
            <strong>This email corresponds to an existing account.</strong><br />
            Please try another email.
          </div>
        )}

        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing Account?{' '}
          <Link className="underline" href={'/login'}>
            Login Here
          </Link>
        </div>
      </form>
    </section>
  );
}




