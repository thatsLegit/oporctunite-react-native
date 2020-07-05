
export const SELECTIONNER_EVALUATION = 'SELECTIONNER_EVALUATION';
export const DESELECTIONNER_EVALUATION = 'DESELECTIONNER_EVALUATION';
export const SUPPRIMER_SELECTION = 'SUPPRIMER_SELECTION';


export const supprimerDeLaSelection = nomEvaluation => {
    return { type: DESELECTIONNER_EVALUATION, nomEvaluation };
};

export const supprimerEvalSelection = () => {
    return { type: SUPPRIMER_SELECTION };
};

export const ajouterALaSelection = evaluation => {
    return {
        type: SELECTIONNER_EVALUATION, evaluation
    };
};

