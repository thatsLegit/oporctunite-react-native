import { fetchUserData, dropUserData, insertUserData } from '../../helper/db/requetes';

export const SET_UTILISATEUR = 'SET_UTILISATEUR';
export const UPDATE_PERSONAL_DATA = 'UPDATE_PERSONAL_DATA';


export const fetchUtilisateur = isConnected => {
    return async (dispatch, getState) => {

        const idutilisateur = getState().auth.idutilisateur;

        if (isConnected) {
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

            //Dans sqlite: idutilisateur, nomElevage, codePostal, adresse, ville, email, telephone, tailleElevage

            const resData = await response.json();
            const elevage = resData.elevage;
            const utilisateur = resData.utilisateur;

            await dropUserData(idutilisateur);
            await insertUserData(idutilisateur, elevage.nomElevage, utilisateur.codePostal, utilisateur.adresse, utilisateur.ville, utilisateur.email, utilisateur.telephone, elevage.tailleElevage);

            //Dans le store: l'integralité des tables utilisateur et elevage de mysql distante
            dispatch({ type: SET_UTILISATEUR, utilisateur: utilisateur, elevage: elevage });

        } else {

            //Si pas de co, dans le store, la même chose que dans sqlite
            const result = await fetchUserData(idutilisateur);
            const userData = result.rows._array[0];

            const elevage = {
                nomElevage: userData.nomElevage,
                tailleElevage: userData.tailleElevage
            };
            const utilisateur = {
                adresse: userData.adresse,
                codePostal: userData.email,
                email: userData.email,
                telephone: userData.telephone,
                ville: userData.ville
            };

            dispatch({ type: SET_UTILISATEUR, utilisateur: utilisateur, elevage: elevage });
        }
    };
};

export const changerDonneesPersos = (dataName, dataValue) => {
    return async dispatch => {


        dispatch({ type: UPDATE_PERSONAL_DATA, utilisateur: resData.utilisateur, elevage: resData.elevage });
    }
};