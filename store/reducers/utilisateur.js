import { SET_UTILISATEUR, UPDATE_PERSONAL_DATA } from "../actions/utilisateur";
import { LOGOUT } from "../actions/auth";

const initialState = {
    utilisateur: null,
    elevage: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_UTILISATEUR:
            return {
                ...state,
                utilisateur: action.utilisateur,
                elevage: action.elevage
            }
        case LOGOUT:
            return initialState
        default:
            return state;
    }
};

