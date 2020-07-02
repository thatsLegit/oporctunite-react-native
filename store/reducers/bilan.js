//actions
import { SET_NOTE_CATEG, SET_NOTE_GLOBALE_CATEG } from '../actions/bilan';

//Etat initial
const initialState = {
    noteCateg: {}, // Tableau qui contient la moyenne de categorie avec leur nom
    noteGlobaleCateg: {}  // Tableau qui contient la moyenne globale de categorie avec leur nom
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTE_CATEG:
            return {
                ...state,
                noteCateg: action.bilan
            };
        case SET_NOTE_GLOBALE_CATEG:
            return {
                ...state,
                noteGlobaleCateg: action.bilan
            };
        default:
            return state;
    }
};