"use client"
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { CookiesProvider, useCookies} from 'react-cookie';
export default function Profilepage({user}) {
    const [cookies, setCookie, getCookie] = useCookies(["user", "userPhone"]);
    const [email, setEmail] = useState('');
    const [haveSetEmail, toggleSetEmail] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [haveSetPhoneNumber, toggleSetPhoneNumber] = useState(true);
    const [error, seterror] = useState(false);


    function handleFormSubmitEmail(e){
        e.preventDefault();
        toggleSetEmail(true);
        setCookie("user", email, { path: "/" });
        axios
        .post(
            "http://localhost:8000/api/users",
            {
                email: email,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.message);
            seterror(true);
        });
        

    }
    function handleFormSubmitPhoneNumber(e){
        e.preventDefault();
        toggleSetPhoneNumber(true);
        setCookie("userPhone", phoneNumber, { path: "/" });
        axios
        .post(
            "http://localhost:8000/api/users",
            {
                phoneNumber: phoneNumber,
            },
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.message);
            seterror(true);
        });
        

    }

    return(
        <CookiesProvider>
        <section class="mt-8">
            <p>Email</p>
            {(haveSetEmail && cookies.user) &&(
                <div class="my-4 text-center">
                   Current email: {' '} {cookies.user}
                   <button type="submit" onClick= {e => toggleSetEmail(false)}>Update Email</button>
                </div>
            )}
            {!haveSetEmail &&(
                <form class="block max-w-xs mx-auto">
                <input type="email" onChange={e => setEmail(e.target.value)}/>
                <button type="submit" onClick={handleFormSubmitEmail}>Save Email</button>
                </form>
            )}
            <p>Phone Number</p>
            {(haveSetPhoneNumber && cookies.userPhone) &&(
                <div class="my-4 text-center">
                Current phone number: {' '} {cookies.userPhone}
                <button type="submit" onClick= {e => toggleSetPhoneNumber(false)}>Update Phone Number</button>
             </div>
            )}
            {(!haveSetPhoneNumber || !cookies.userPhone) &&(
                <form class="block max-w-xs mx-auto">
                <input type="text" onChange={e => setPhoneNumber(e.target.value)}/>
                <button type="submit" onClick={handleFormSubmitPhoneNumber}>Save Phone Number</button>
                </form>
            )}
            
        </section>
        </CookiesProvider>
    );
}