//actions
import { SET_FICHES } from '../actions/fiche';


//Etat initial
const initialState = {
    fiches: {}
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
