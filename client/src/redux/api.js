import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = JSON.parse(localStorage.getItem("user")).user;
    }
    return req;
});

export const getAllPets = (page) => API.get(`/pets?page=${page}`);
export const addPet = (formData) => API.post(`/pets`, formData);
export const deletePet = (id) => API.delete(`/pets/${id}`);
export const updatePet = (formData, id) => API.put(`/pets/${id}`, formData);
export const searchPet = (name) => API.get(`/pets/search?name=${name}`);
export const imgUpload = (image) => API.post(`/pets/upload`, image);