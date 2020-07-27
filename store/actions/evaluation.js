import Liaison from '../../models/Liaison';

export const SELECTIONNER_EVALUATION = 'SELECTIONNER_EVALUATION';
export const DESELECTIONNER_EVALUATION = 'DESELECTIONNER_EVALUATION';
export const SUPPRIMER_SELECTION = 'SUPPRIMER_SELECTION';
export const SET_LIAISONS = 'SET_LIAISONS';


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

export const fetchLiaisons = () => {
    return async (dispatch, getState) => {
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
        let loadedLiaisons = {};
        resData.data.forEach(liaison => {
            loadedLiaisons = {
                ...loadedLiaisons, [liaison.idLiaison]: new Liaison(
                    liaison.idLiaison,
                    liaison.NomEvalDouble
                )
            }
        });

        dispatch({ type: SET_LIAISONS, liaisons: loadedLiaisons });
    };
};

