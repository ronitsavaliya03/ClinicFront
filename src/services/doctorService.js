import { api } from "./api";

export const getDoctorQueue = async () => {
    const response = await api.get("/doctor/queue");
    return response;
};


