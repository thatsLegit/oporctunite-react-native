//actions
import { SET_FICHES, SET_FAVORIS } from '../actions/fiche';


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
        default:
            return state;
    }
};
