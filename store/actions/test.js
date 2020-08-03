import NetInfo from '@react-native-community/netinfo';
//Models
import Test from '../../models/Test';
import { insertTest } from '../../helper/db/requetes';
//Actions
export const AJOUTER_TEST = 'AJOUTER_TEST';
export const SUPPRIMER_TESTS_EN_COURS = 'SUPPRIMER_TESTS_EN_COURS';


export const ajouterTest = (valeur, nomEvaluation) => {
    return { type: AJOUTER_TEST, test: new Test(valeur, nomEvaluation) };
};

export const annulerTests = () => {
    return { type: SUPPRIMER_TESTS_EN_COURS };
};

export const soumettreTests = () => {
    return async (dispatch, getState) => {
        const tests = getState().test.enCours;
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/tests";
        const bearer = 'Bearer ' + token;

        for (const test of tests) {
            const connection = await NetInfo.fetch();

            if (!connection.isConnected) {
                await insertTest(test.nomEvaluation, test.valeur);
            } else {
                const valeur = test.valeur;
                const nomEvaluation = test.nomEvaluation;

                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': bearer
                    },
                    body: JSON.stringify({
                        nomEvaluation,
                        valeur
                    })
                });
            }
        };

        dispatch({ type: SUPPRIMER_TESTS_EN_COURS });
    };
};
