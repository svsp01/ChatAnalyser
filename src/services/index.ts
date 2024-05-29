import axios, { AxiosInstance } from "axios";

const URL = import.meta.env.VITE_BASE_URL
console.log(URL, ">>>");

const token = localStorage.getItem("token")

const commonHeaders = {
    "Content - Type": "application/json"
}

function createAxiosInstance(headers: any): AxiosInstance {
    return axios.create({
        baseURL: URL,
        headers: headers
    })
}


export const instanceWithBearerToken: AxiosInstance = createAxiosInstance({
    ...commonHeaders,
    "Authorization": `${token}`
});

export const instanceWithoutBearerToken: AxiosInstance = createAxiosInstance({
    commonHeaders
})
