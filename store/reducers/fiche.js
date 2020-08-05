//actions
import { SET_RECOMMANDATIONS, SET_FICHES } from '../actions/fiche';


//Etat initial
const initialState = {
    fiches: {},
    fichesRecommandees: {}
};


export default (state = initialState, action) => {
    switch (action.type) {
        case SET_FICHES:
            return {
                fiches: action.fiches
            };
        default:
            return state;
    }
};
