import { api } from "./api";


export const getReports = async () => {
    const response = await api.get("/reports/my");
    return response;
}

export const addReportByAppointment = async (appointmentId, data) => {
    const response = await api.post(`/reports/${appointmentId}`, data);
    return response;
}