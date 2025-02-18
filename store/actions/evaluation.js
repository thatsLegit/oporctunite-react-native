import {
    insertLiaisons, dropLiaisons, fetchAllLiaisons,
    insertEvaluation, dropEvaluation
} from '../../helper/db/requetes';
import Liaison from '../../models/Liaison';

export const SELECTIONNER_EVALUATION = 'SELECTIONNER_EVALUATION';
export const DESELECTIONNER_EVALUATION = 'DESELECTIONNER_EVALUATION';
export const SUPPRIMER_SELECTION = 'SUPPRIMER_SELECTION';
export const SET_LIAISONS = 'SET_LIAISONS';
export const SET_EVALUATIONS = 'SET_EVALUATIONS';


export const supprimerDeLaSelection = nomEvaluation => {
    return { type: DESELECTIONNER_EVALUATION, nomEvaluation };
};

export const supprimerEvalSelection = () => {
    return { type: SUPPRIMER_SELECTION };
};

export const ajouterALaSelection = evaluation => {
    return { type: SELECTIONNER_EVALUATION, evaluation };
};

export const fetchEvaluations = async (token, maj, isConnected) => {
    //Une fois tous les 7j min, si on a une co :
    //insert/drop toutes les lignes de la table evaluation (sqlite)
    if (isConnected && maj) {
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/evaluations";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();
        await dropEvaluation();

        for (const evaluation of resData.data) {
            await insertEvaluation(evaluation.nomEvaluation, evaluation.description, evaluation.nbTruies, evaluation.priorite, evaluation.idLiaison, evaluation.nomCategorieP);
        }
    }
};

export const fetchLiaisons = isConnected => {
    return async (dispatch, getState) => {

        const maj = getState().auth.maj;
        let loadedLiaisons = {};

        //Comme pour les évals, insert/drop de la table liaisons
        if (isConnected && maj) {
            const token = getState().auth.token;
            const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/liaisons";
            const bearer = 'Bearer ' + token;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'authorization': bearer,
                    'Content-Type': 'application/json'
                }
            });

            const resData = await response.json();
            await dropLiaisons();

            for (const liaison of resData.data) {
                await insertLiaisons(liaison.idLiaison, liaison.NomEvalDouble)
                loadedLiaisons = {
                    ...loadedLiaisons, [liaison.idLiaison]: new Liaison(
                        liaison.idLiaison,
                        liaison.NomEvalDouble
                    )
                }
            }

        } else {
            //Le reste du temps, fetch les données sur sqlite (en ligne ou hors-ligne)
            const liaisons = await fetchAllLiaisons();

            for (const liaison of liaisons.rows._array) {
                loadedLiaisons = {
                    ...loadedLiaisons, [liaison.idLiaison]: new Liaison(
                        liaison.idLiaison,
                        liaison.nomEvalDouble
                    )
                }
            }
        }

        //Dispatcher dans le store
        dispatch({ type: SET_LIAISONS, liaisons: loadedLiaisons });
    };
};

