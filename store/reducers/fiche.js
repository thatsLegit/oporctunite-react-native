//actions
import { SET_FICHES, SET_FAVORIS, ADD_FAVORIS, DELETE_FAVORIS, SET_SAVE, ADD_SAVE, DELETE_SAVE } from '../actions/fiche';


//Etat initial
const initialState = {
    fiches: {},
    favoris: {},
    save: []
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
        case SET_SAVE:
            return {
                ...state,
                save: action.savedFiches
            };
        case ADD_SAVE:
            let updatedSave = [...state.save];
            updatedSave.push(action.titreFiche);
            return {
                ...state,
                save: updatedSave
            };
        case DELETE_SAVE:
            let updatedSave2 = [...state.save];
            updatedSave2.filter(titre => titre == action.titreFiche);
            return {
                ...state,
                save: updatedSave2
            };
        default:
            return state;
    }
};
