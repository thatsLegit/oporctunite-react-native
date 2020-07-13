import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN, SET_UTILISATEUR } from "../actions/auth";

const initialState = {
    token: null,
    idutilisateur: null,
    utilisateur: null,
    elevage: null,
    didTryAutoLogin: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DID_TRY_AUTO_LOGIN:
            return {
                ...state,
                didTryAutoLogin: true
            }
        case AUTHENTICATE:
            return {
                token: action.token,
                idutilisateur: action.idutilisateur,
                didTryAutoLogin: true
            };
        case SET_UTILISATEUR:
            return {
                ...state,
                utilisateur: action.utilisateur,
                elevage: action.elevage
            }
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        default:
            return state;
    }
};

