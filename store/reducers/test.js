//actions
import { AJOUTER_TEST } from '../actions/test';

//Etat initial
const initialState = {
    enCours: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AJOUTER_TEST:
            const newTest = action.test;
            return {
                ...state,
                enCours: { ...state.enCours, [action.nomEvaluation]: newTest }
            }
        default:
            return state;
    }
};