//actions
import { SELECTIONNER_EVALUATION, DESELECTIONNER_EVALUATION, SELECTIONNER_TOUTES_LES_EVALUATIONS } from '../actions/evaluation';

//Etat initial
const initialState = {
    evaluations:{},
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
        case SELECTIONNER_TOUTES_LES_EVALUATIONS:
            
            return {
                ...state,
                evaluations:  { ...state.evalSelection, [action.evaluation.nomEvaluation]: action.evaluation }
                
            };
        default:
            return state;
    }
};