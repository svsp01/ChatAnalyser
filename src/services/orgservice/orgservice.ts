import axios from "axios";
import { AxiosInstance } from "..";

export const getAllOrg = async () => {
    try {
        const response = await AxiosInstance.get("/getAllOrganization");
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
