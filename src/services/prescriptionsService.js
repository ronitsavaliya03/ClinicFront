import { api } from "./api";

export const getPrescriptions = async () => {
    const response = await api.get("/prescriptions/my");
    return response;
}

export const addPrescriptionByAppointment = async (appointmentId, data) => {
    const response = await api.post(`/prescriptions/${appointmentId}`, data);
    return response;
}