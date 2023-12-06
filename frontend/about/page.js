"use client"
import Image from 'next/image'
import Right from "@/components/icons/Right"
import {useState} from 'react'
import axios from 'axios'
import Link from 'next/link';
import { CookiesProvider, useCookies} from 'react-cookie';
export default function Aboutpage({user}){
    const [cookies, setCookie] = useCookies(["user"]);
    return (
        <CookiesProvider>
        <section class = "hero mt-4">
            <div class="py-12">
                <p class= "my-4 text-subtitle text-md">
                    With your Parking Spotter account, you will be able to create a parking history, create reports, and get notified about parking updates!
                </p>
                <div class="flex gap-4">
                    <Link href={'/Profile'} className= "flex gap-2 py-2 text-gray-600 font-semibold">View My Profile Information
                    <Right/>
                    </Link>
                    
                </div>

                <div class="flex gap-4">
                    <Link href={'/ParkingHistory'} className="flex gap-2 py-2 text-gray-600 font-semibold">View My Parking History
                    <Right/>
                    </Link>
                </div>

                <div class="flex gap-4">
                    <Link href={'/notifications'} className="flex gap-2 py-2 text-gray-600 font-semibold">View My Notification Settings
                    <Right/>
                    </Link>
                </div>    
                
                


            </div>
            <div class="relative mt-4">

           


            </div>
       
        </section>
        </CookiesProvider>
        
        
        
      


    );
}