//Models
import Test from '../../models/Test';
//Actions
export const AJOUTER_TEST = 'AJOUTER_TEST';
export const SUPPRIMER_TESTS_EN_COURS = 'SUPPRIMER_TESTS_EN_COURS';


export const ajouterTest = (note, nomEvaluation) => {
    return { type: AJOUTER_TEST, test: new Test(note, nomEvaluation) };
};

export const annulerTests = () => {
    return { type: SUPPRIMER_TESTS_EN_COURS };
};

export const soumettreTests = () => {
    return async (dispatch, getState) => {

        const tests = Object.values(getState().test.enCours);
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/tests";
        const bearer = 'Bearer ' + token;
        //let resData = [];

        for (const key of tests) {
            const valeur = key.valeur;
            const nomEvaluation = key.nomEvaluation;

            response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': bearer
                },
                body: JSON.stringify({
                    valeur,
                    nomEvaluation
                })
            });
            //await resData.push(response.json());
        };

        dispatch({ type: SUPPRIMER_TESTS_EN_COURS });
    };
};
