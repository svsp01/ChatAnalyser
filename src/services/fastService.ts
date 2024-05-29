import { instanceWithoutBearerToken } from "././index"

const getDataFromApi = async (data: any) => {
    try {
        const response = await instanceWithoutBearerToken.post("/", data);
        return response;
    } catch (error) {
        throw error;
    }
}


export const freeService = {
    getDataFromApi
}