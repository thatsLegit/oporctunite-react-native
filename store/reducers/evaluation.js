//actions
import { SELECTIONNER_EVALUATION, DESELECTIONNER_EVALUATION } from '../actions/evaluation';

//Etat initial
const initialState = {
    evalSelection: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECTIONNER_EVALUATION:
            return {
                ...state,
                evalSelection: { ...state.evalSelection, [action.evaluation.nomEvaluation]: action.evaluation }
            };
        case DESELECTIONNER_EVALUATION:
            let updatedEvalSelection = { ...state.evalSelection };
            delete updatedEvalSelection[action.nomEvaluation];
            return {
                ...state,
                evalSelection: updatedEvalSelection
            };
        default:
            return state;
    }
};