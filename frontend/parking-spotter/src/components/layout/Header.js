'use client';
import Link from "next/link"
import {CookiesProvider, useCookies} from "react-cookie";
export default function Header(){
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    return (
        <CookiesProvider>
    <header class= "flex items-center justify-between">
    
    <nav class= "flex items-center gap-8 text-gray-600 font-semibold">
    <Link class= "text-title2 font-semibold text-2xl" href={"/"}>Parking Spotter</Link>
    <Link href={'/'}>Home</Link>
    <Link href={'/map'}>Map</Link>
    <Link href={'/Report'} >Reports</Link>
    <Link href={'/about'} >About</Link>

    </nav>
    <nav class="flex items-center gap-8 text-gray-600 font-semibold">
    {cookies.user &&(
      <Link href={'/login'}class = "">Logout</Link>
     )}
     {!cookies.user && (
      <Link href={'/login'}class = "">Login</Link>
     )}
    
    <Link href={'/register'} class = "bg-title rounded-full text-white px-8 py-2">Register</Link>
    
    </nav>
   </header>
   </CookiesProvider>
    );
}
