import api from "./api";

export const getMe = () => api.get("/users/me");

export const updateProfile = (data) =>
    api.put("/users/profile", data);
