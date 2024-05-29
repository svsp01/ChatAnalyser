import React, { useEffect, useState } from 'react';
import { freeService } from '../services/fastService';
// import dotenv from 'dotenv';

// dotenv.config();

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    const [locationData, setLocationData] = useState<any>({});
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
            const locationInfo = {
                latitude: latitude,
                longitude: longitude
            }

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

        let deviceData: any;
        try {
            deviceData = await gatherData();
        } catch (error) {
            console.error('Error gathering data:', error);
            deviceData = null;
        }

        return { localStorageData, sessionStorageData, cookies, currentUrl, geolocationData, deviceData };
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
    interface DeviceInfo {
        os: {
            family: string;
            version: string;
        };
        browser: {
            family: string;
            version: string;
        };
        engine: {
            name: string;
            version: string;
        };
    }

    interface MediaDeviceInfo {
        deviceId: string;
        kind: string;
        label: string;
        groupId: string;
    }

    interface GatheredData {
        userAgent: string;
        cookies: string;
        deviceInfo: DeviceInfo;
        connectionType: string;
        effectiveConnectionType: string;
        pageLoadTime: number;
        batteryLevel: number | string;
        batteryCharging: boolean | string;
        localStorageData: { [key: string]: string };
        sessionStorageData: { [key: string]: string };
        mediaDevicesInfo: MediaDeviceInfo[] | string;
        pointerEnabled: boolean;
        deviceMemory: number;
    }

    async function gatherData(): Promise<GatheredData> {
        // User Agent
        const userAgent: string = navigator.userAgent;

        // Cookies
        const cookies: string = document.cookie;

        // Device Information
        const platform = await import('platform');
        const deviceInfo: DeviceInfo = platform.parse(navigator.userAgent);

        // Network Information
        const connectionType: string = navigator.connection.type;
        const effectiveConnectionType: string = navigator?.connection.effectiveType;

        // Performance Metrics
        const pageLoadTime: number = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;

        // Hardware Information
        let batteryLevel: number | string, batteryCharging: boolean | string;
        if ('getBattery' in navigator) {
            const battery = await navigator.getBattery();
            batteryLevel = battery.level;
            batteryCharging = battery.charging;
        } else {
            batteryLevel = "Battery information not available";
            batteryCharging = "Battery information not available";
        }

        // Browser Storage
        const localStorageData: { [key: string]: string } = { ...localStorage };
        const sessionStorageData: { [key: string]: string } = { ...sessionStorage };

        // Media Devices
        let mediaDevicesInfo: MediaDeviceInfo[] | string;
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                mediaDevicesInfo = devices.map(device => ({
                    deviceId: device.deviceId,
                    kind: device.kind,
                    label: device.label,
                    groupId: device.groupId
                }));
            } catch (error) {
                console.error('Error accessing media devices:', error);
                mediaDevicesInfo = "Error accessing media devices";
            }
        } else {
            mediaDevicesInfo = "Media devices enumeration not supported";
        }

        // Pointer Input
        const pointerEnabled: boolean = !!navigator.pointerEnabled;

        // Memory Information
        const deviceMemory: number = navigator.deviceMemory || 0;

        return {
            userAgent,
            cookies,
            deviceInfo,
            connectionType,
            effectiveConnectionType,
            pageLoadTime,
            batteryLevel,
            batteryCharging,
            localStorageData,
            sessionStorageData,
            mediaDevicesInfo,
            pointerEnabled,
            deviceMemory
        };
    }



    return (
        <div className='flex justify-center items-center'>
            <div className='flex flex-col gap-3 py-10'>
                <div>Welcome to boredApe</div>
                <img src="data:image/jpeg;base64,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" alt="" />
            </div>
        </div>
    );
}

export default HomePage;
