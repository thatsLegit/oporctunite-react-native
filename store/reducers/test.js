//actions
import { AJOUTER_TEST, SUPPRIMER_TESTS_EN_COURS } from '../actions/test';

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
                enCours: { ...state.enCours, [newTest.nomEvaluation]: newTest.valeur }
            };
        case SUPPRIMER_TESTS_EN_COURS:
            return {
                ...state,
                enCours: new Object()
            };
        default:
            return state;
    }
};