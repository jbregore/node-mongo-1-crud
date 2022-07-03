import {
    GET_PETS,
    ADD_PET,
    DELETE_PET,
    UPDATE_PET,
    SEARCH_PET
} from "../actionTypes";
import * as api from "../api";

export const getAllPets = (page) => async (dispatch) => {
    try {
        const { data } = await api.getAllPets(page);
        console.log(data);
        dispatch({ type: GET_PETS, payload: data})
    } catch (e) {
        console.log(e);
    }
};

export const addPet = (formData, image) => async (dispatch) => {
    try {
        if(image){
            const { data: photoUrl } = await api.imgUpload(image);
            console.log(photoUrl);
            formData.selectedFile = photoUrl.photoUrl;
            const { data } = await api.addPet(formData);
            console.log(data);
            dispatch({ type: ADD_PET, payload: data});
        }else{
            const { data } = await api.addPet(formData);
            console.log(data);
            dispatch({ type: ADD_PET, payload: data});
        }
    } catch (e) {
        console.log(e);
    }
};

export const deletePet = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletePet(id);
        console.log(data);
        dispatch({ type: DELETE_PET, payload: data.data});
    } catch (e) {
        console.log(e);
    }
}

export const updatePet = (formData, image, id) => async (dispatch) => {
    try {
        if(image){
            const { data: photoUrl } = await api.imgUpload(image);
            console.log(photoUrl);
            formData.selectedFile = photoUrl.photoUrl;
            const { data } = await api.updatePet(formData, id);
            dispatch({ type: UPDATE_PET, payload: data});
        }else{
            const { data } = await api.updatePet(formData, id);
            console.log(data);
            dispatch({ type: UPDATE_PET, payload: data});
        }
    } catch (e) {
        console.log(e);
    }
}

export const searchPet = (search) => async (dispatch) => {
    try {
        const { data } = await api.searchPet(search);
        dispatch({ type: SEARCH_PET, payload: data.data});
    } catch (e) {
        console.log(e);
    }
}
