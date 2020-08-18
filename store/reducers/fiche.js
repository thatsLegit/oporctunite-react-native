//actions
import { SET_FICHES, SET_FAVORIS, ADD_FAVORIS, DELETE_FAVORIS } from '../actions/fiche';


//Etat initial
const initialState = {
    fiches: {},
    favoris: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FICHES:
            return {
                ...state,
                fiches: action.fiches
            };
        case SET_FAVORIS:
            return {
                ...state,
                favoris: action.favoris
            };
        case ADD_FAVORIS:
            return {
                ...state,
                favoris: { ...state.favoris, [action.fiche.titreFiche]: action.fiche }
            };
        case DELETE_FAVORIS:
            let updatedFavoris = { ...state.favoris };
            delete updatedFavoris[action.titreFiche];
            return {
                ...state,
                favoris: updatedFavoris
            };
        default:
            return state;
    }
};
