
export const SELECTIONNER_EVALUATION = 'SELECTIONNER_EVALUATION';
export const DESELECTIONNER_EVALUATION = 'DESELECTIONNER_EVALUATION';
export const SELECTIONNER_TOUTES_LES_EVALUATIONS  = 'SELECTIONNER_TOUTES_LES_EVALUATIONS';


export const supprimerDeLaSelection = nomEvaluation => {
    return { type: DESELECTIONNER_EVALUATION, nomEvaluation };
};

export const ajouterALaSelection = evaluation => {
    return {
        type: SELECTIONNER_EVALUATION, evaluation
    };
};

export const fetchEvaluations = () => {
    return async (dispatch) => {
        const response = await fetch('https://oporctunite.envt.fr/oporctunite-api/api/v1/evaluations');
        const resData = await response.json();
        let loadedEvaluations = {};
        resData.data.forEach(evaluation => {
            loadedEvaluations = {
                ...loadedEvaluations, [evaluation.nomEvaluation]: {}
            }
        });

        dispatch({ type: SELECTIONNER_TOUTES_LES_EVALUATIONS, evaluation: loadedEvaluations });
    };
};