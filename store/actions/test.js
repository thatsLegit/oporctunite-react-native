import NetInfo from '@react-native-community/netinfo';
//Models
import Test from '../../models/Test';
import { insertTest } from '../../helper/db/requetes';
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

        const connection = await NetInfo.fetch();
        if (!connection.isConnected) {
            for (const key of tests) {
                await insertTest(key, key.valeur);
            }
        } else {
            const token = getState().auth.token;
            const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/tests";
            const bearer = 'Bearer ' + token;

            for (const key of tests) {
                const valeur = key.valeur;
                const nomEvaluation = key;

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
            };
        }

        dispatch({ type: SUPPRIMER_TESTS_EN_COURS });
    };
};
