//Models
import Test from '../../models/Test';
//Actions
export const AJOUTER_TEST = 'AJOUTER_TEST';
export const SUPPRIMER_TESTS_EN_COURS = 'SUPPRIMER_TESTS_EN_COURS';


export const ajouterTest = (note, nomEvaluation) => {
    return { type: AJOUTER_TEST, test: new Test(note, 'FR00000', nomEvaluation) };
};

export const annulerTests = () => {
    return { type: SUPPRIMER_TESTS_EN_COURS };
};

export const soumettreTests = () => {
    return async (dispatch, getState) => {

        const tests = Object.values(getState().test.enCours);
        //let resData = [];

        for (const key of tests) {
            const valeur = key.valeur;
            const numEleveur = key.numEleveur;
            const nomEvaluation = key.nomEvaluation;

            const response = await fetch(`https://oporctunite.envt.fr/oporctunite-api/api/v1/tests`, {
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
            //await resData.push(response.json()); Pour plus tard ça
        };

        dispatch({ type: SUPPRIMER_TESTS_EN_COURS });
    };
};
