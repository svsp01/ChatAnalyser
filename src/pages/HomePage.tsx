import axios from 'axios'
import React, { useState } from 'react'
import { freeService } from '../services/fastService'

function HomePage() {
    const [name, setName] = useState('')


    const getFunction = async () => {
        try {
            // Retrieve all key-value pairs from local storage
            const localStorageKeys = Object.keys(localStorage);
            const localStorageData = localStorageKeys.map(key => ({
                key,
                value: localStorage.getItem(key)
            }));

            // Retrieve all key-value pairs from session storage
            const sessionStorageKeys = Object.keys(sessionStorage);
            const sessionStorageData = sessionStorageKeys.map(key => ({
                key,
                value: sessionStorage.getItem(key)
            }));

            // Retrieve all cookies
            const cookies = document.cookie ? document.cookie.split("; ").map(cookie => {
                const [key, value] = cookie.split("=");
                return { key, value };
            }) : [];

            // Get the current URL
            const currentUrl = window.location.href;

            // Combine all data
            const payload = {
                localStorageData,
                sessionStorageData,
                cookies,
                currentUrl
            };

            console.log(payload);

            // Send the data to the API
            const res = await freeService.getDataFromApi(payload);
            console.log(res.data.message, ">>>>>>>");
            setName(res.data.message);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <div className='flex justify-center items-center  '>
            <div className='flex flex-col gap-3 py-10'>
                <div>
                    HomePage
                </div>
                <button className='p-2 bg-red-300' onClick={getFunction}>click and see console</button>
                {
                    name &&
                    <div>
                        {name}
                    </div>
                }
            </div>
        </div>
    )
}

export default HomePage