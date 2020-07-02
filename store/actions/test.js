export const AJOUTER_TEST = 'AJOUTER_TEST';


export const ajouterTest = (test) => {
    return { type: AJOUTER_TEST, test, nomEvaluation: test.nomEvaluation };
};