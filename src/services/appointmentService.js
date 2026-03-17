import { api } from "./api";

export const getAppointments = async () => {
    const response = await api.get("/appointments/my");
    return response;
};

export const createAppointment = async (data) => {
    const response = await api.post("/appointments", data);
    return response;
}

export const getAppointmentById = async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response;
}