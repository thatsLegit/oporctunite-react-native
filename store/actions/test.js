export const AJOUTER_TEST = 'AJOUTER_TEST';
export const SOUMETTRE_TESTS = 'SOUMETTRE_TESTS';


export const ajouterTest = (test) => {
    return { type: AJOUTER_TEST, test, nomEvaluation: test.nomEvaluation };
};

export const soumettreTests = () => {
    return (dispatch, getState) => {

        const tests = Object.values(getState().test.enCours);
        tests.forEach(test => {
            const valeur = test.valeur;
            const numEleveur = test.numEleveur;
            const nomEvaluation = test.nomEvaluation;

            const response = fetch(`https://oporctunite.envt.fr/oporctunite-api/api/v1/tests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    valeur,
                    numEleveur,
                    nomEvaluation
                })
            });

        });
    };
};