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
            };
        case UPDATE_PERSONAL_DATA:
            let utilisateurModified = { ...state.utilisateur };
            utilisateurModified.codePostal = action.utilisateurData.codePostal;
            utilisateurModified.adresse = action.utilisateurData.adresse;
            utilisateurModified.ville = action.utilisateurData.ville;
            utilisateurModified.email = action.utilisateurData.email;
            utilisateurModified.telephone = action.utilisateurData.telephone;
            let elevageModified = { ...state.elevage };
            elevageModified.nomElevage = action.elevageData.nomElevage;
            elevageModified.tailleElevage = action.elevageData.tailleElevage;
            return {
                ...state,
                utilisateur: utilisateurModified,
                elevage: elevageModified
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

