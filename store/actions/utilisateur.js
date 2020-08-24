export const SET_UTILISATEUR = 'SET_UTILISATEUR';
export const UPDATE_PERSONAL_DATA = 'UPDATE_PERSONAL_DATA';

export const setUtilisateur = () => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const url = "https://oporctunite.envt.fr/oporctunite-api/api/v1/auth/me";
        const bearer = 'Bearer ' + token;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'authorization': bearer,
                'Content-Type': 'application/json'
            }
        });

        const resData = await response.json();
        dispatch({ type: SET_UTILISATEUR, utilisateur: resData.utilisateur, elevage: resData.elevage });
    };
};

export const changerDonneesPersos = (dataName, dataValue) => {
    return async dispatch => {


        dispatch({ type: UPDATE_PERSONAL_DATA, utilisateur: resData.utilisateur, elevage: resData.elevage });
    }
};