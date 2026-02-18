import api from "./api";

export const uploadImage = (file) => {
    const data = new FormData();
    data.append("avatar", file);

    return api.post("/upload", data);
};
