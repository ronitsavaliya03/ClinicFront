import { api }from "./api";

export const getQueue = async (date) => {
    const response = await api.get("/queue", { params: { date } });
    return response;
};

export const updateQueue = async (id, data) => {
    const response = await api.patch(`/queue/${id}`, data);
    return response;
}