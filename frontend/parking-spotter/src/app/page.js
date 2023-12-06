'use client';
import React from "react";
import Hero from "@/components/layout/Hero"
import LoginPage from ".//login/page"
import {CookiesProvider, useCookies} from "react-cookie";

export default function Home() {
  const [cookies, setCookie] = useCookies(["user"]);

  return (
    <CookiesProvider>
   <div>
     {cookies.user &&(
      <Hero user = {cookies.user} />
     )}
     {!cookies.user && (
      <LoginPage user = {cookies.user}/>
     )}
   </div>
   </CookiesProvider>
  );
}
