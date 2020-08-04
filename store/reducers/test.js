//actions
import { AJOUTER_TEST, SUPPRIMER_TESTS_EN_COURS } from '../actions/test';

//Etat initial
const initialState = {
    enCours: [],
    lastSentEvalsDidReachApi: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AJOUTER_TEST:
            const newTest = action.test;
            return {
                ...state,
                enCours: state.enCours.concat(newTest)
            };
        case SUPPRIMER_TESTS_EN_COURS:
            return {
                ...state,
                enCours: new Array(),
                lastSentEvalsDidReachApi: action.sentToApi
            };
        default:
            return state;
    }
};