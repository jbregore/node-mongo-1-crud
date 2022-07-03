import {
    GET_PETS,
    ADD_PET,
    DELETE_PET,
    UPDATE_PET,
    SEARCH_PET
} from "../actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {
    petList: []
}, action) => {
    switch (action.type) {
        case GET_PETS:
            return {
                ...state,
                petList: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
                totalPets: action.payload.totalPets
            };
        case ADD_PET:
            return {
                ...state,
                petList: [...state.petList, action.payload],
                totalPets: Number(state.totalPets) + 1
            }
        case DELETE_PET:
            return {
                ...state,
                petList: state.petList.filter((pet) => pet._id !== action.payload),
            }
        case UPDATE_PET:
            return {
                ...state,
                petList: state.petList.map((pet) =>
                    pet._id === action.payload._id ? action.payload : pet
                ),
            };
        case SEARCH_PET: {
            return {
                ...state,
                petList: action.payload
            }
        }
        default:
            return state;
    }
};
