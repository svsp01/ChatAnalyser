import { AxiosInstance } from "..";

export const ChatQuestion = async (id: any,data: any) => {
    console.log(data, ">>>>>>>")
    try {
        const response = await AxiosInstance.post(`/query/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

