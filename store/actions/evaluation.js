
export const SELECTIONNER_EVALUATION = 'SELECTIONNER_EVALUATION';
export const DESELECTIONNER_EVALUATION = 'DESELECTIONNER_EVALUATION';



export const supprimerDeLaSelection = nomEvaluation => {
    return { type: DESELECTIONNER_EVALUATION, nomEvaluation };
};

export const ajouterALaSelection = evaluation => {
    return {
        type: SELECTIONNER_EVALUATION, evaluation
    };
};