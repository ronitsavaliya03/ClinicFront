// Admin: clinic info and create users
import {api} from "./api";

export const getAdminDashboard = async () => {
    const response = await api.get("/admin/clinic");
    return response;
}

export const getAllUsers = async () => {
    const response = await api.get("/admin/users");
    return response;
}

export const createUser = async (data) => {
    const response = await api.post("/admin/users", data);
    return response;
}