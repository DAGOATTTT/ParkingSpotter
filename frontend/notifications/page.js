'use client';
import {useState} from 'react';
import Image from 'next/image';
import axios from 'axios'
export default function NotificationPage(){
    let active = false
    
    function toggleMobilePush() {
        let toggle = document.querySelector('#mobilePush')
        let text = document.querySelector('#mobilePushText')
        active = !active
        if (active) {
            toggle.classList.add('active')
            text.innerHTML = 'ON'
        } else {
            toggle.classList.remove('active')
            text.innerHTML = 'OFF'
        }
    }
    function toggleEmail() {
        let toggle = document.querySelector('#email')
        let text = document.querySelector('#emailText')
        active = !active
        if (active) {
            toggle.classList.add('active')
            text.innerHTML = 'ON'
        } else {
            toggle.classList.remove('active')
            text.innerHTML = 'OFF'
        }
    }
    function toggleText() {
        let toggle = document.querySelector('#text')
        let text = document.querySelector('#textText')
        active = !active
        if (active) {
            toggle.classList.add('active')
            text.innerHTML = 'ON'
        } else {
            toggle.classList.remove('active')
            text.innerHTML = 'OFF'
        }
    }

    return(
        <p>
        <span>
        <section class = "hero mt-4">
            <div class="container">
            Mobile Notifications:              
            <span class="tab"></span>
                <div id="mobilePush" class="toggle" onClick={toggleMobilePush}>
                  <div class="circle"></div>
                </div>
                <span id="mobilePushText" class="text">OFF</span>
            </div>
        </section>
        </span>

        <span>
        <section class = "hero mt-4">
            <div class="container">
            Email Notifications:              
            <span class="tab"></span>
                <div id="email" class="toggle" onClick={toggleEmail}>
                  <div class="circle"></div>
                </div>
                <span id="emailText" class="text">OFF</span>
            </div>
        </section>
        </span>

        <span>
        <section class = "hero mt-4">
            <div class="container">
            Text Notifications:              
            <span class="tab"></span>
                <div id="text" class="toggle" onClick={toggleText}>
                  <div class="circle"></div>
                </div>
                <span id="textText" class="text">OFF</span>
            </div>
        </section>
        </span>
        </p>
    );
}