import { use } from "react";
import { api } from "./api";

export const loginService = async (data) => {
    const response = await api.post("/auth/login", data);
    console.log(response.data)
    if (!response.error){
        localStorage.setItem("token", response.data.token);
        // const userData = atob(response.data.token.split(".")[1]);
        // console.log("Decoded user data:", userData);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(JSON.stringify(response.data.user));
    }
    return response;
};

export const logoutService = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

export const getUserData = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const getToken = () => {
    return localStorage.getItem("token");
}