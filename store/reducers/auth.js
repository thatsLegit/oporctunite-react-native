import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN, SET_UTILISATEUR } from "../actions/auth";

const initialState = {
    token: null,
    idutilisateur: null,
    didTryAutoLogin: false,
    maj: false
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
                didTryAutoLogin: true,
                maj: action.maj
            };
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        default:
            return state;
    }
};

