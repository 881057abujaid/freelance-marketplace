import api from "./api";

export const getGigs = (params) => {
    return api.get("/gigs", { params });
};
export const createGig = (data) =>
    api.post("/gigs", data);
export const getMyGigs = () => api.get("/gigs/my");

export const deleteGig = (id) => api.delete(`/gigs/${id}`);

export const getGigById = (id) => api.get(`/gigs/${id}`);

export const updateGig = (id, data) =>
  api.put(`/gigs/${id}`, data);
